
export type User = {
    id: number | null,
    name: string,
    email: string,
    password: string,
    address: string,
    phone: string
};

export const getCurrentUser = async (): Promise<User> => {
    return {
        id: 1,
        name: "John Doe",
        email: "john.doe@example.com",
        password: "hashedpassword",
        address: "123 Main St",
        phone: "123-456-7890"
    };
};


type Action ={
    type: 'CREATE'|'UPDATE'|'GET'|'REMOVE',
    data: Partial<User>
}


export const userReducer=(state:User, action:Action) :User =>{

    switch(action.type){
        case 'CREATE':{
            const {id,name,password,email,address,phone}= action.data as Partial<User>
            
            return {
                id:id??null,
                name: name||'',
                password: password || '',
                email:email||'',
                address:address||'',
                phone:phone||''
                
            }}

        case 'UPDATE':
            
            return {
                ...state,
                id: action.data.id !== undefined ? action.data.id : state.id,
                name: action.data.name || state.name,
                password :state.password,
                email: action.data.email || state.email,
                address: action.data.address || state.address,
                phone: action.data.phone || state.phone,
               
            }
        default:
            return state

    }

}