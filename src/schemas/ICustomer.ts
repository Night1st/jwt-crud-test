export interface ICustomer {
    id: string,
    customerCode: string,
    status: number,
    source: number,
    social_media: number,
    service: string | any,
    full_name: string,
    gender: string,
    date_of_birth: Date,
    phone_number: string,
    follow_up_date: Date,
    follow_down_date: Date,
    address: string,
    city: string,
    district: string,
    ward: string,
    detailed_info: string,
    notes: string,
    comments: IComment[]
}

export interface IComment {
    id?: string,
    title: string,
    time: Date,
    status_id: number
}
