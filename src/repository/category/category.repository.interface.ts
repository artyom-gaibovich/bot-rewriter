export interface CategoryRepositoryInterface {
    findAll() : Promise<CategoriesInterface>
}