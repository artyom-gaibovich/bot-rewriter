export interface CategoryInterface {
	title: string;
	value: string;
	sequence?: number;
	prompt?: string;
}

export interface CategoryServiceInterface {
	getAll(): Promise<{ categories: CategoryInterface[] }>;

	create(req: { categories: CategoryInterface }): Promise<{ categories: CategoryInterface[] }>;

	delete(req: { categories: CategoryInterface }): Promise<{ categories: CategoryInterface[] }>;

	update(req: { categories: CategoryInterface }): Promise<{ categories: CategoryInterface[] }>;
}
