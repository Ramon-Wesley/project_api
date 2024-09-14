export interface TokenInterface{
    generatedToken( expiresIn:string,subject:string):string
    verifyToken(token:string):any
}