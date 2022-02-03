interface ICreateUserDTO {
    id?: string //opcional
    name: string
    password: string
    email: string
    driver_license: string
    avatar?: string// opcional
}

export { ICreateUserDTO }