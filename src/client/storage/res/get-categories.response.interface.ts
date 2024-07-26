interface GetCategoriesResponseInterface {
	status: 'OK' | 'ERROR';
	categories?: CategoryInterface[] | [];
}
