// 1. เปลี่ยนการ import ให้มี createRoomService ด้วย
const { createRoomService } = require('../../controllers/roomservices');
const RoomService = require('../../models/Roomservice');
const Hotel = require('../../models/Hotel'); // เพิ่มการนำเข้า Hotel

// 2. ต้อง Mock ทั้ง RoomService และ Hotel
jest.mock('../../models/Roomservice');
jest.mock('../../models/Hotel');

describe("RoomService Controller - createRoomService", () => {
  let req, res;

  beforeEach(() => {
    jest.clearAllMocks();
    
    req = {
      body: {},
      params: {}
    };
    
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  it("ควรสร้างบริการสำหรับโรงแรมที่ระบุได้สำเร็จ", async () => {
    
    const mockHotelId = "1234"; 
    
    req.params.hotelId = mockHotelId;
    req.body = {
      name: "Extra Bed",
      description: "เตียงเสริม",
      minQuantity: 1,
      maxQuantity: 5
    };

    
    Hotel.findById.mockResolvedValue({ 
        _id: mockHotelId, 
        name: "Mock Hotel Name" 
    });

    
    const mockCreatedService = { 
      _id: "mock_service_id_123", 
      hotel: mockHotelId, 
      ...req.body, 
      status: "available" 
    };
    RoomService.create.mockResolvedValue(mockCreatedService);

    // เรียกใช้ฟังก์ชัน
    await createRoomService(req, res);

    // ตรวจสอบว่า findById ถูกเรียกด้วย ID ที่เราสมมติขึ้นมาจริงๆ ใช่ไหม
    expect(Hotel.findById).toHaveBeenCalledWith(mockHotelId);
    expect(res.status).toHaveBeenCalledWith(201);
});
});