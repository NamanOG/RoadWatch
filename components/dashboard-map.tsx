"use client"

import { useEffect, useState } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import type { Report } from "@/lib/mock-data"

// Custom hand-drawn style marker icons
const createIcon = (color: string, isSelected: boolean = false) => {
  const size = isSelected ? 44 : 36
  const strokeWidth = isSelected ? 3 : 2
  
  return L.divIcon({
    className: "custom-marker",
    html: `
      <svg width="${size}" height="${size * 1.3}" viewBox="0 0 40 52" fill="none" xmlns="http://www.w3.org/2000/svg" style="filter: drop-shadow(0 4px 6px rgba(0,0,0,0.2));">
        <path d="M20 2 C9 2 2 10 2 20 C2 35 20 50 20 50 C20 50 38 35 38 20 C38 10 31 2 20 2" 
          fill="${color}" 
          stroke="${isSelected ? '#1e1b4b' : '#374151'}" 
          stroke-width="${strokeWidth}" 
          stroke-linecap="round" 
          stroke-linejoin="round"
        />
        <circle cx="20" cy="20" r="8" fill="white" stroke="${color}" stroke-width="2"/>
        <circle cx="20" cy="20" r="3" fill="${color}"/>
        ${isSelected ? '<circle cx="20" cy="20" r="16" fill="none" stroke="white" stroke-width="2" opacity="0.6"/>' : ''}
      </svg>
      ${isSelected ? `
        <style>
          @keyframes ping {
            0% { transform: scale(1); opacity: 1; }
            100% { transform: scale(2); opacity: 0; }
          }
        </style>
        <div style="position: absolute; top: 8px; left: 8px; width: ${size - 16}px; height: ${size - 16}px; background: ${color}; border-radius: 50%; animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite; opacity: 0.3;"></div>
      ` : ''}
    `,
    iconSize: [size, size * 1.3],
    iconAnchor: [size / 2, size * 1.3],
    popupAnchor: [0, -size * 1.2],
  })
}

const severityColors = {
  high: "#ef4444",
  medium: "#f97316",
  low: "#22c55e",
}

const statusIcons = {
  pending: "⏳",
  in_progress: "🔧",
  resolved: "✅",
}

function MapUpdater({ center, zoom }: { center: [number, number]; zoom?: number }) {
  const map = useMap()
  useEffect(() => {
    if (zoom) {
      map.flyTo(center, zoom, { duration: 0.8 })
    } else {
      map.flyTo(center, map.getZoom(), { duration: 0.5 })
    }
  }, [center, zoom, map])
  return null
}

function MapLegend() {
  return (
    <div className="absolute bottom-4 left-4 z-[1000] bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-3 border border-border">
      <p className="text-xs font-semibold text-muted-foreground mb-2">Severity</p>
      <div className="space-y-1.5">
        {Object.entries(severityColors).map(([severity, color]) => (
          <div key={severity} className="flex items-center gap-2">
            <div 
              className={`w-3 h-3 rounded-full ${
                severity === "high" ? "bg-[#ef4444]" : 
                severity === "medium" ? "bg-[#f97316]" : 
                "bg-[#22c55e]"
              }`}
            />
            <span className="text-xs capitalize">{severity}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

type DashboardMapProps = {
  reports: Report[]
  selectedReport: Report | null
  onSelectReport: (report: Report) => void
}

export default function DashboardMap({ reports, selectedReport, onSelectReport }: DashboardMapProps) {
  const [mapReady, setMapReady] = useState(false)
  
  // Always center on India by default; fly to selected report on demand
  // [20, 78] centers on India's geographic midpoint; zoom 4.3 fits the whole subcontinent
  const INDIA_CENTER: [number, number] = [20.0, 78.0]
  const INDIA_ZOOM = 4.3

  const flyToCenter: [number, number] = selectedReport
    ? [selectedReport.latitude, selectedReport.longitude]
    : INDIA_CENTER

  const flyToZoom = selectedReport ? 10 : INDIA_ZOOM

  return (
    <div className="relative h-full w-full">
      <MapContainer
        center={INDIA_CENTER}
        zoom={INDIA_ZOOM}
        className="h-full w-full"
        style={{ minHeight: "300px", background: "#f1f5f9" }}
        whenReady={() => setMapReady(true)}
      >
        {/* Use a cleaner, more modern map style */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        {/* Only animate the map when a report is selected */}
        {selectedReport && (
          <MapUpdater center={flyToCenter} zoom={flyToZoom} />
        )}
        {/* Render markers */}
        {reports.map((report) => {
          const isSelected = selectedReport?.id === report.id
          
          return (
            <Marker
              key={report.id}
              position={[report.latitude, report.longitude]}
              icon={createIcon(severityColors[report.severity], isSelected)}
              eventHandlers={{
                click: () => onSelectReport(report),
              }}
              zIndexOffset={isSelected ? 1000 : 0}
            >
              <Popup className="custom-popup">
                <div className="min-w-[220px] p-1">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-bold text-sm leading-tight">{report.title}</h3>
                    <span className="text-lg" title={report.status.replace("_", " ")}>
                      {statusIcons[report.status]}
                    </span>
                  </div>
                  
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-white text-xs font-medium ${
                        report.severity === "high" ? "bg-red-500" :
                        report.severity === "medium" ? "bg-orange-500" : "bg-green-500"
                      }`}>
                        {report.severity.charAt(0).toUpperCase() + report.severity.slice(1)} Priority
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-muted-foreground">
                      <div>
                        <span className="font-medium text-foreground">Type</span>
                        <p className="capitalize">{report.issue_type.replace("_", " ")}</p>
                      </div>
                      <div>
                        <span className="font-medium text-foreground">Road</span>
                        <p className="uppercase text-xs">{report.road_type}</p>
                      </div>
                    </div>
                    
                    <div className="pt-2 border-t border-border">
                      <span className="font-medium text-foreground">Authority</span>
                      <p className="text-primary font-medium">{report.authority}</p>
                    </div>
                    
                    {report.location_address && (
                      <p className="text-muted-foreground text-xs pt-1 border-t border-border">
                        📍 {report.location_address}
                      </p>
                    )}
                  </div>
                </div>
              </Popup>
            </Marker>
          )
        })}
        
        {/* Add a pulsing circle around selected report */}
        {selectedReport && (
          <Circle
            center={[selectedReport.latitude, selectedReport.longitude]}
            radius={2000}
            pathOptions={{
              color: severityColors[selectedReport.severity],
              fillColor: severityColors[selectedReport.severity],
              fillOpacity: 0.1,
              weight: 2,
              dashArray: "5, 10",
            }}
          />
        )}
      </MapContainer>
      
      {/* Legend */}
      <MapLegend />
      
      {/* Report count badge */}
      <div className="absolute top-4 right-4 z-[1000] bg-white/95 backdrop-blur-sm rounded-full shadow-lg px-3 py-1.5 border border-border">
        <span className="text-sm font-medium">
          <span className="text-primary font-bold">{reports.length}</span>
          <span className="text-muted-foreground"> reports</span>
        </span>
      </div>
    </div>
  )
}
