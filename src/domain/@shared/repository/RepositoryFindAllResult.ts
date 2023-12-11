import Entity from "../entity/Entity";

export default interface RepositoryFindAllResult<T extends Entity>{
    entity:T[];
    number_of_elements:number;
    current_page:number;
    total_page:number;
}