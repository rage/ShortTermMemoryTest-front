describe("getList", function() {
    
    beforeEach(function() {
    });
    
    it("right order type", function() {

        var us = new User();
        us.set(CreateRandomTestUser());
        var settings = new Settings();
        var list = new GetList(us,settings);
        var list = list.getNextList();
        
        expect(list.length).toBe(12);
        expect(list[0]["order"]).toBe("backwards");
        expect(list[1]["order"]).toBe("upwards");
        expect(list[2]["order"]).toBe("upwards");
        expect(list[3]["order"]).toBe("upwards");
        expect(list[4]["order"]).toBe("upwards");
        expect(list[5]["order"]).toBe("backwards");
        expect(list[6]["order"]).toBe("backwards");
        expect(list[7]["order"]).toBe("upwards");
        expect(list[8]["order"]).toBe("backwards");
        expect(list[9]["order"]).toBe("upwards");
        expect(list[10]["order"]).toBe("upwards");
        expect(list[11]["order"]).toBe("backwards");
        
        
    });
    
    it("correct numbers", function() {
        var us = new User();
        us.set(CreateRandomTestUser());
        var settings = new Settings();
        var list = new GetList(us,settings);
        var list = list.getNextList();
        
        expect(list[0]["numbers"]).toEqual([5,7,3,8]);
        expect(list[1]["numbers"]).toEqual([4,7,1]);
        expect(list[2]["numbers"]).toEqual([0,5]);
        expect(list[3]["numbers"]).toEqual([7,3,8,5,9,3,5]);
        expect(list[4]["numbers"]).toEqual([4,7,3,8]);
        expect(list[5]["numbers"]).toEqual([5,9,6,4,0,4]);
        expect(list[6]["numbers"]).toEqual([6,3]);
        expect(list[7]["numbers"]).toEqual([7,5,8]);
        expect(list[8]["numbers"]).toEqual([9,2,5,3,7]);
        expect(list[9]["numbers"]).toEqual([4,6,8,9,1,5,3]);
        expect(list[10]["numbers"]).toEqual([6,2,7,9]);
        expect(list[11]["numbers"]).toEqual([4,6]);
        
        
    });
});
