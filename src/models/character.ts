interface location {
    name: string;
    url:string;
}

export interface Character {
    id:number;
    name:string;
    status:string;
    species: string;
    type:string;
    gender:string;
    origin:location;
    location:location;
    image:string;
    url:string;
    episode:string[];
    created:string;   
}