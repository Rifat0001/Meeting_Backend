export interface TRoom {
    name: string;
    roomNo: number; // Unique room number
    floorNo: number; // Floor level
    capacity: number;
    pricePerSlot: number;
    amenities: string[]; // Array of amenities (strings)
    isDeleted: boolean;
  }
  
