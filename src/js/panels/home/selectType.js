import React from 'react';
import {connect} from 'react-redux';

import {closePopout, goBack, openModal, openPopout, setPage} from '../../store/router/actions';

import API from '../../../API/API';

import Mushroom from '../../../image/mushroom.png';
import Sausage from '../../../image/sausage.png';
import Porridge from '../../../image/porridge.png';
import Butter from '../../../image/butter.png';
import Milk from '../../../image/milk.png';
import Flour from '../../../image/flour.png';
import Meat from '../../../image/meat.png';
import Vegetables from '../../../image/vegetables.png';
import Nut from '../../../image/nut.png';
import Fish from '../../../image/fish.png';
import Lunchbox from '../../../image/lunchbox.png';
import Cheese from '../../../image/cheese.png';
import Pepper from '../../../image/pepper.png';
import Fruits from '../../../image/fruits.png';
import Bread from '../../../image/bread.png';
import Berries from '../../../image/berries.png';
import Eggs from '../../../image/eggs.png';
import Sweets from '../../../image/sweets.png';
import IceCream from '../../../image/ice-cream.png';
import Cake from '../../../image/cake.png';
import Chocolate from '../../../image/chocolate.png';
import Whiskey from '../../../image/whiskey.png';
import Coffee from '../../../image/coffee.png';
import Juice from '../../../image/juice.png';
import Salad from '../../../image/salad.png';
import Soup from '../../../image/soup.png';
import BurgerKing from '../../../image/burger-king.png';
import KFC from '../../../image/kfc.png';
import McDonalds from '../../../image/mcdonalds.png';
import Sushi from '../../../image/sushi.png';
import Baby from '../../../image/baby.png';
import EnergyDrink from '../../../image/energy-drink.png';
import Foods from '../../../image/foods.png';

import {
    Panel,
    PanelHeader,
    Div,
    Title,
    Cell,
    PanelHeaderBack,
} from "@vkontakte/vkui";

var Index, Category;

var productsCategoryOne = [
  {id: 0, name: 'Грибы', category: 1, icon: Mushroom},
  {id: 1, name: 'Колбасные изделия', category: 1, icon: Sausage},
  {id: 2, name: 'Крупы и каши', category: 1, icon: Porridge},
  {id: 3, name: 'Масла и жиры', category: 1, icon: Butter},
  {id: 4, name: 'Молочные продукты', category: 1, icon: Milk},
  {id: 5, name: 'Мука и мучные изделия', category: 1, icon: Flour},
  {id: 6, name: 'Мясные продукты', category: 1, icon: Meat},
  {id: 7, name: 'Овощи и зелень', category: 1, icon: Vegetables},
  {id: 8, name: 'Орехи и сухофрукты', category: 1, icon: Nut},
  {id: 9, name: 'Рыба и морепродукты', category: 1, icon: Fish},
  {id: 10, name: 'Снэки', category: 1, icon: Lunchbox},
  {id: 11, name: 'Сыры и творог', category: 1, icon: Cheese},
  {id: 12, name: 'Сырье и приправы', category: 1, icon: Pepper},
  {id: 13, name: 'Фрукты', category: 1, icon: Fruits},
  {id: 14, name: 'Хлебобулочные изделия', category: 1, icon: Bread},
  {id: 15, name: 'Ягоды', category: 1, icon: Berries},
  {id: 16, name: 'Яйца', category: 1, icon: Eggs}
];

var productsCategoryTwo = [
  {id: 17, name: 'Кондитерские изделия и сладости', category: 2, icon: Sweets},
  {id: 18, name: 'Мороженое', category: 2, icon: IceCream},
  {id: 19, name: 'Торты', category: 2, icon: Cake},
  {id: 20, name: 'Шоколад', category: 2, icon: Chocolate}
];

var productsCategoryThree = [
  {id: 21, name: 'Напитки алкогольные', category: 3, icon: Whiskey},
  {id: 22, name: 'Напитки безалкогольные', category: 3, icon: Coffee},
  {id: 23, name: 'Соки и компоты', category: 3, icon: Juice}
];

var productsCategoryFour = [
  {id: 24, name: 'Салаты', category: 4, icon: Salad},
  {id: 25, name: 'Первые блюда', category: 4, icon: Soup},
  {id: 26, name: 'Burger King', category: 4, icon: BurgerKing},
  {id: 27, name: 'KFC', category: 4, icon: KFC},
  {id: 28, name: "McDonald's", category: 4, icon: McDonalds},
  {id: 29, name: 'Японская кухня', category: 4, icon: Sushi}
];

var productsCategoryFive = [
  {id: 30, name: 'Детское питание', category: 5, icon: Baby},
  {id: 31, name: 'Спортивное и другое питание', category: 5, icon: EnergyDrink}
];

var productsCategorySix = [
  {id: 32, name: 'Полный список продуктов', category: 6, icon: Foods}
]

var CategoriesNames = ['Продукты и изделия','Сладости','Напитки и алкоголь','Общественное питание','Специальное питание','Разное'];

class HomePanelSelectType extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
        };

        this.api = new API();
        this.openList = this.openList.bind(this);
    }

    openList(index, category) {
      Index = index;
      Category = category;
      
      this.props.setPage('home','selectProduct');
    }

    async componentDidMount() {
        
    }

    render() {
        const {id, setPage, colorScheme, openPopout, goBack, closePopout} = this.props;
        
        return (
            <Panel id={id}>
                <PanelHeader left={<PanelHeaderBack onClick={goBack} />}>Выбор типа продукта</PanelHeader>
                <Div><Title level="1" weight="heavy">{CategoriesNames[0]}</Title></Div>
                {productsCategoryOne.map((item, index) => <>
                  <Cell style={{ cursor: 'pointer' }} onClick={() => this.openList(index, 1)} before={<img style={{ fill: '#3f8ae0', height: 36, width: 36, marginRight: 5 }} src={productsCategoryOne[index].icon}/>} expandable>{productsCategoryOne[index].name}</Cell>
                  <br/>
                </>)}
                <Div><Title level="1" weight="heavy">{CategoriesNames[1]}</Title></Div>
                {productsCategoryTwo.map((item, index) => <>
                  <Cell style={{ cursor: 'pointer' }} onClick={() => this.openList(index, 2)} before={<img style={{ fill: '#3f8ae0', height: 36, width: 36, marginRight: 5 }} src={productsCategoryTwo[index].icon}/>} expandable>{productsCategoryTwo[index].name}</Cell>
                  <br/>
                </>)}
                <Div><Title level="1" weight="heavy">{CategoriesNames[2]}</Title></Div>
                {productsCategoryThree.map((item, index) => <>
                  <Cell style={{ cursor: 'pointer' }} onClick={() => this.openList(index, 3)} before={<img style={{ fill: '#3f8ae0', height: 36, width: 36, marginRight: 5 }} src={productsCategoryThree[index].icon}/>} expandable>{productsCategoryThree[index].name}</Cell>
                  <br/>
                </>)}
                <Div><Title level="1" weight="heavy">{CategoriesNames[3]}</Title></Div>
                {productsCategoryFour.map((item, index) => <>
                  <Cell style={{ cursor: 'pointer' }} onClick={() => this.openList(index, 4)} before={<img style={{ fill: '#3f8ae0', height: 36, width: 36, marginRight: 5 }} src={productsCategoryFour[index].icon}/>} expandable>{productsCategoryFour[index].name}</Cell>
                  <br/>
                </>)}
                <Div><Title level="1" weight="heavy">{CategoriesNames[4]}</Title></Div>
                {productsCategoryFive.map((item, index) => <>
                  <Cell style={{ cursor: 'pointer' }} onClick={() => this.openList(index, 5)} before={<img style={{ fill: '#3f8ae0', height: 36, width: 36, marginRight: 5 }} src={productsCategoryFive[index].icon}/>} expandable>{productsCategoryFive[index].name}</Cell>
                  <br/>
                </>)}
                {this.state.snackbar}
            </Panel>
        );
    }
}

const mapDispatchToProps = {
    setPage,
    goBack,
    openPopout,
    closePopout,
    openModal
};

const mapStateToProps = (state) => {
    return {
        colorScheme: state.vkui.colorScheme
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePanelSelectType);
export var Index;
export var Category;