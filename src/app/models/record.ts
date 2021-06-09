import { Car } from "./car"
import { Customer } from "./customer"

export class Record{
    rentalId!: string
    recordCarId!: string
    recordCustomerId!: string
    rentDate!: string
    returnDate!: string
    customerInformation!: Customer
    carInformation!: Car
}
