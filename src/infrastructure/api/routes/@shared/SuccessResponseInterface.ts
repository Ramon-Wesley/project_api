export default interface ResponseFindInterface{
send?:{},
_links?:{
    self:{
        href:string
    }
    first?:{
        href:string
    }
    last?:{
        href:string
    }
},

_embedded?:{
    entity?: [{}] | {}
},
status:number


}