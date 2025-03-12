const {sequelize} = require('./db')
const {Restaurant, Menu} = require('./models/index')
const {
    seedRestaurant,
    seedMenu,
  } = require('./seedData');

describe('Restaurant and Menu Models', () => {
    /**
     * Runs the code prior to all tests
     */
    beforeAll(async () => {
        // the 'sync' method will create tables based on the model class
        // by setting 'force:true' the tables are recreated each time the 
        // test suite is run
        await sequelize.sync({ force: true });
    });

    test('can create a Restaurant', async () => {
        const testRest = await Restaurant.create({
            name: "Goobies Pasta",
            location: "ABC Glorbon Drive",
            cuisine: "Pasta"
        });
        expect(testRest.name).toEqual('Goobies Pasta');
    });

    test('can create a Menu', async () => {
        const testMenu = await Menu.create({
            title: "Gloop"
        });
        expect(testMenu.title).toEqual('Gloop');
    });

    test('can find Restaurants', async () => {
        const foundRest = await Restaurant.findByPk(1);
        expect(foundRest.name).toEqual('Goobies Pasta');
    });

    test('can find Menus', async () => {
        const foundMenu = await Menu.findByPk(1);
        expect(foundMenu.title).toEqual('Gloop');
    });

    test('can delete Restaurants', async () => {
        let gary = await Restaurant.findByPk(1);
        const deletedRest = await gary.destroy();
        expect(deletedRest.name).toEqual('Goobies Pasta');
    });

    test("Can eager load", async ()=> {
        const restaurant = await Restaurant.create({ name: "Olive Garden", location: "Texas", cuisine: "pasta" })
        const menus = [
            await Menu.create({ title: "Test 1" }),
            await Menu.create({ title: "Test 2" })
        ];
        await restaurant.addMenu(menus[0]); 
        await restaurant.addMenu(menus[1]); 
        const eagerLoadedMenuList = await Restaurant.findAll({
            include: [
                { model: Menu }
            ]
        });
        expect(await eagerLoadedMenuList[0]["Menus"][0].title).toBe(menus[0].title);
    });
});
