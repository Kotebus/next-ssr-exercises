interface IDataRaw {
  id: string;
  imageSrc: string;
  imageAlt: string;
  title: string;
  price: number;
  quantity?: number;
}

const DATA:IDataRaw[] = [
  {
    id: 'hk123',
    imageSrc: '/shopping-cart-coffee-machine.jpg',
    imageAlt:
        'A pink drip coffee machine with the “Hello Kitty” logo',
    title: '“Hello Coffee”',
    price: 89.99,
  },
  {
    id: 'co999',
    imageSrc: '/shopping-cart-can-opener.jpg',
    imageAlt: 'A black can opener',
    title: 'Can Opener',
    price: 19.95,
  },
  {
    id: 'cnl333',
    imageSrc: '/shopping-cart-night-light.png',
    imageAlt:
      'A kid-friendly nightlight sculpted to look like a dog astronaut',
    title: 'Astro-pup',
    price: 130.0,
  },
];

export interface IData {
  id: string;
  imageSrc: string;
  imageAlt: string;
  title: string;
  price: number;
  quantity: number;
}

export const getDataWithQuantity = () =>
    DATA.map((item: IDataRaw) => <IData>{...item, quantity: 0});

export default getDataWithQuantity;
