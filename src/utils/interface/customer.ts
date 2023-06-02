//customer contact add
export interface ContactProjection {
   id: string
   name: string
   phone_number: string
}
//page customer add
export interface CustomerDataForSave extends Omit<ContactProjection, 'id'> {
   admin: string
}

//page customer detail
export interface CustomerDetail extends ContactProjection {
   contact_person_id: string
}
