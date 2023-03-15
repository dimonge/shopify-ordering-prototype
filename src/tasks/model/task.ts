import {  Task } from "@prisma/client"
export default function buildMakeTask() {
  return function makeTask({
    id,
    type,
    tracking_code,
    status,
    currency,
    amount,
    email,
    vat_in_percent,
    distance_in_meter,
    pickup_location,
    dropoff_location,
    custom_dropoff_location,
    pickup_time,
    actual_pickup_time,
    returned_at,
    drop_off_time,
    actual_dropoff_time,

    customer_signature_type,
    pickup_comments_for_courier,
    dropoff_comments_for_courier,
/*
    courier_id,
    order_id,
    fleet_id,

    created_at,
    modified_at,
    deleted_at,
    
    created_by,
    modified_by,
    deleted_by
*/
    ...props
  }:Task) {

    // validate input
    return Object.freeze({
      getId: () => id,
      getType: () => type,
      getTrackingCode: () => tracking_code,
      getStatus: () => status,
      getCurrency: () => currency,
      getAmount: () => amount,
      getEmail: () => email,
      getVatInPercent: () => vat_in_percent,
      getDistanceInMeter: () => distance_in_meter,
      getPickupLocation: () => pickup_location,
      getDropoffLocation: () => dropoff_location,
      getCustomDropoffLocation: () => custom_dropoff_location,
      getPickupTime: () => pickup_time,
      getActualPickupTime: () => actual_pickup_time,
      getReturnedAt: () => returned_at,
      getDropoffTime: () => drop_off_time,
      getActualDropoffTime: () => actual_dropoff_time,
      ...props
    })
  }
}