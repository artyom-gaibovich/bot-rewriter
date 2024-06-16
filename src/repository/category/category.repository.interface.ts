export interface CategoryRepositoryInterface {
    findAll() : Promise<CategoryInterface[]>
}