export type Report = {
  id: string
  created_at: string
  title: string
  description: string
  issue_type: 'pothole' | 'broken_signal' | 'damaged_road' | 'illegal_parking' | 'missing_sign' | 'waterlogging'
  severity: 'low' | 'medium' | 'high'
  status: 'pending' | 'in_progress' | 'resolved'
  latitude: number
  longitude: number
  road_type: 'NH' | 'SH' | 'MDR' | 'other'
  authority: 'NHAI' | 'State PWD' | 'District Engineer' | 'Municipal Corporation'
  photo_url?: string
  location_address?: string
}

export const ISSUE_TYPES = [
  { value: 'pothole', label: 'Pothole' },
  { value: 'broken_signal', label: 'Broken Signal' },
  { value: 'damaged_road', label: 'Damaged Road' },
  { value: 'illegal_parking', label: 'Illegal Parking' },
  { value: 'missing_sign', label: 'Missing Sign' },
  { value: 'waterlogging', label: 'Waterlogging' },
] as const

export const ROAD_TYPES = [
  { value: 'NH', label: 'National Highway (NH)' },
  { value: 'SH', label: 'State Highway (SH)' },
  { value: 'MDR', label: 'Major District Road (MDR)' },
  { value: 'other', label: 'Other / Local Road' },
] as const

export const SEVERITIES = [
  { value: 'low', label: 'Low', color: 'bg-green-500' },
  { value: 'medium', label: 'Medium', color: 'bg-orange-500' },
  { value: 'high', label: 'High', color: 'bg-red-500' },
] as const

export const STATUSES = [
  { value: 'pending', label: 'Pending' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'resolved', label: 'Resolved' },
] as const

export const AUTHORITIES = [
  { value: 'NHAI', label: 'NHAI' },
  { value: 'State PWD', label: 'State PWD' },
  { value: 'District Engineer', label: 'District Engineer' },
  { value: 'Municipal Corporation', label: 'Municipal Corporation' },
] as const

// Authority routing logic
export function getAuthority(roadType: string): Report['authority'] {
  switch (roadType) {
    case 'NH': return 'NHAI'
    case 'SH': return 'State PWD'
    case 'MDR': return 'District Engineer'
    default: return 'Municipal Corporation'
  }
}

// Mock reports data - locations around major Indian cities
export const mockReports: Report[] = [
  {
    id: '1',
    created_at: '2026-05-10T10:30:00Z',
    title: 'Large pothole on highway',
    description: 'Dangerous pothole causing traffic slowdown near toll plaza',
    issue_type: 'pothole',
    severity: 'high',
    status: 'pending',
    latitude: 28.6139,
    longitude: 77.209,
    road_type: 'NH',
    authority: 'NHAI',
    location_address: 'NH-48, Near IGI Airport, Delhi',
  },
  {
    id: '2',
    created_at: '2026-05-09T14:20:00Z',
    title: 'Traffic signal not working',
    description: 'Signal has been off for 3 days, causing accidents',
    issue_type: 'broken_signal',
    severity: 'high',
    status: 'in_progress',
    latitude: 19.076,
    longitude: 72.8777,
    road_type: 'SH',
    authority: 'State PWD',
    location_address: 'Western Express Highway, Andheri, Mumbai',
  },
  {
    id: '3',
    created_at: '2026-05-08T09:15:00Z',
    title: 'Road surface damaged',
    description: 'Multiple cracks and uneven surface after monsoon',
    issue_type: 'damaged_road',
    severity: 'medium',
    status: 'pending',
    latitude: 13.0827,
    longitude: 80.2707,
    road_type: 'MDR',
    authority: 'District Engineer',
    location_address: 'OMR Road, Chennai',
  },
  {
    id: '4',
    created_at: '2026-05-07T16:45:00Z',
    title: 'Waterlogging after rain',
    description: 'Severe waterlogging blocking entire lane',
    issue_type: 'waterlogging',
    severity: 'medium',
    status: 'resolved',
    latitude: 12.9716,
    longitude: 77.5946,
    road_type: 'other',
    authority: 'Municipal Corporation',
    location_address: 'MG Road, Bangalore',
  },
  {
    id: '5',
    created_at: '2026-05-06T11:00:00Z',
    title: 'Speed limit sign missing',
    description: 'Speed limit sign removed, cars speeding dangerously',
    issue_type: 'missing_sign',
    severity: 'low',
    status: 'pending',
    latitude: 17.385,
    longitude: 78.4867,
    road_type: 'NH',
    authority: 'NHAI',
    location_address: 'NH-65, Hyderabad',
  },
  {
    id: '6',
    created_at: '2026-05-05T08:30:00Z',
    title: 'Illegal parking blocking road',
    description: 'Trucks parked illegally blocking half the road',
    issue_type: 'illegal_parking',
    severity: 'low',
    status: 'in_progress',
    latitude: 23.0225,
    longitude: 72.5714,
    road_type: 'SH',
    authority: 'State PWD',
    location_address: 'SG Highway, Ahmedabad',
  },
  {
    id: '7',
    created_at: '2026-05-04T13:00:00Z',
    title: 'Deep pothole near school',
    description: 'Dangerous pothole near school entrance, risk to children',
    issue_type: 'pothole',
    severity: 'high',
    status: 'pending',
    latitude: 26.9124,
    longitude: 75.7873,
    road_type: 'other',
    authority: 'Municipal Corporation',
    location_address: 'MI Road, Jaipur',
  },
  {
    id: '8',
    created_at: '2026-05-03T17:30:00Z',
    title: 'Road cave-in after construction',
    description: 'Part of road has caved in after metro construction',
    issue_type: 'damaged_road',
    severity: 'high',
    status: 'in_progress',
    latitude: 22.5726,
    longitude: 88.3639,
    road_type: 'MDR',
    authority: 'District Engineer',
    location_address: 'Park Street, Kolkata',
  },
]
