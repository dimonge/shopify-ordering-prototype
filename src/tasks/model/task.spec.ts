import buildMakeTask from "@/tasks/model"

describe("task", () => {
  it("should have include task", async() => {
    const task = {
      id: '1',
      type: "delivery",
      tracking_code: "1232",
      status: "not_started",
      amount: 4.40,
      currency: 'eur',
      vat_in_percent: 24.4,
      distance_in_meter: "1200",
      pickup_location: "Pickup location",
      dropoff_location: "Dropoff location",
      pickup_time: new Date(),
      drop_off_time: new Date(),
      created_at: new Date(),
      modified_at: new Date(),
      created_by: "123",
      modified_by: "123",
      dropoff_comments_for_courier: 'comment',
      pickup_comments_for_courier: "comment",
      customer_signature_type: "signed"
    }

    expect(buildMakeTask(task).getAmount()).toEqual(4.40)
    
  })
})