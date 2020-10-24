import React from 'react';
import {connect} from 'react-redux';

import {closePopout, goBack, openModal, openPopout, setPage} from '../../store/router/actions';

import API from './../../../API/API';
import Icon16Done from '@vkontakte/icons/dist/16/done';
import Icon16Cancel from '@vkontakte/icons/dist/16/cancel';
import {SquirrelsExport, NameExport, FatsExport, CarbohydratesExport, CaloriesExport} from './product';

import {
    Panel,
    PanelHeader,
    Input,
    FormLayoutGroup,
    FormLayout,
    Group,
    Header,
    Link,
    Placeholder,
    PanelHeaderBack,
    Button,
    Cell,
    List,
    FixedLayout,
    Div,
    Select,
    Snackbar,
    Avatar
} from "@vkontakte/vkui";

var Time = '', Type = '', Data = '';

var products = [
    
];

var lastName = '';

class HomePanelAddEat extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            time: Time,
            type: Type,
            date: Data,
            names: '',
            carbohydrates: '',
            squirrels: '',
            fats: ''
        };

        this.api = new API();
        this.sendError = this.sendError.bind(this);
    }

    sendError (text) {
        if (this.state.snackbar) return;
        this.setState({ snackbar:
          <Snackbar
            layout="vertical"
            onClose={() => this.setState({ snackbar: null })}
            before={<Avatar size={24} style={{ backgroundColor: '#ff0000' }}><Icon16Cancel fill="#fff" width={14} height={14} /></Avatar>}
          >
            {text}
          </Snackbar>
        });
      }

    async componentDidMount() {
        if(this.state.date == '') {
            var date = new Date();
            var day = date.getDate() > 10 ? date.getDate() : '0' + date.getDate();
            var month = date.getMonth() > 10 ? date.getMonth() : '0' + date.getMonth();
            date = date.getFullYear() + '-' + month + '-' + day;
            this.setState({
                date: date
            });
            Data = date;
            date = new Date();
            var minutes = date.getMinutes() > 10 ? date.getMinutes() : '0' + date.getMinutes();
            var hours = date.getHours() > 10 ? date.getHours() : '0' + date.getHours();
            var time = hours + ':' + minutes;
            this.setState({
                time: time
            });
            Time = time;
        }
        this.forceUpdate();
        if(lastName != NameExport && NameExport != undefined) {
            lastName = NameExport;//чтобы не дублировались продукты
            products.push({name: NameExport, squirrels: SquirrelsExport.toFixed(0), fats: FatsExport.toFixed(0), carbohydrates: CarbohydratesExport.toFixed(0), calories: CaloriesExport.toFixed(0)});
            if(products.length == 1) {
                console.log('+');
                this.setState({
                    fats: products[0].fats,
                    calories: products[0].calories,
                    carbohydrates: products[0].carbohydrates,
                    squirrels: products[0].squirrels,
                    names: products[0].name
                });
            }
            else {
                var fats, calories, carbohydrates, squirrels, names;
                
                for (let i = 0; i < products.length; i++) {
                    if(i == 0) {
                        console.log('0');

                        fats = products[0].fats
                        calories = products[0].calories
                        carbohydrates = products[0].carbohydrates
                        squirrels = products[0].squirrels
                        names = products[0].name
                    } else {
                        fats += ';' + products[i].fats
                        calories += ';' + products[i].calories
                        carbohydrates += ';' + products[i].carbohydrates
                        squirrels +=  ';' +products[i].squirrels
                        names = names + ';' + products[i].name;
                    }
                }
                this.setState({
                    fats: fats,
                    calories: calories,
                    carbohydrates: carbohydrates,
                    squirrels: squirrels,
                    names: names,
                });
            }
            this.forceUpdate();
        }
    }

    render() {
        const {id, setPage, colorScheme, openPopout, closePopout, goBack} = this.props;
        
        return (
            <Panel id={id}>
                <PanelHeader left={<PanelHeaderBack onClick={goBack} />}>Новый прием пищи</PanelHeader>
                <div style={{ marginBottom: 80 }}>
                    <FormLayout>
                        <FormLayoutGroup top="Дата принятия пищи">
                            <Input value={this.state.date} onChange={(e) => {
                                this.setState({
                                    date: e.target.value
                                });
                                Data = e.target.value;
                            }} type="date"/>
                        </FormLayoutGroup>
                        <FormLayoutGroup top="Время принятия пищи">
                            <Input value={this.state.time} onChange={(e) => {
                                this.setState({
                                    time: e.target.value
                                });
                                Time = e.target.value;
                            }} type="time"/>
                        </FormLayoutGroup>
                        <FormLayoutGroup top="Тип">
                            <Select placeholder="Выберите тип" value={this.state.type} onChange={(e) => {
                                this.setState({
                                    type: e.target.value
                                });
                                Type = e.target.value;
                            }}>
                                <option>Завтрак</option>
                                <option>Обед</option>
                                <option>Перекус</option>
                                <option>Ужин</option>
                            </Select>
                        </FormLayoutGroup>
                    </FormLayout>
                    <Group header={<Header aside={<Link onClick={() => setPage('home','selectType')}>Добавить</Link>}>Продукты</Header>}>
                        {products.length == 0 && <Placeholder
                        header="Вы не добавили ни одного продукта"
                        action={<Button onClick={() => setPage('home','selectType')} size="l">Добавить продукт</Button>}>
                            Нажмите на кнопку ниже, чтобы исправить это</Placeholder>}
                        {products.length != 0 && <List>
                            {products.map((item, index) => 
                                <Cell key={item} description={item.calories + ' калорий'} removable onRemove={() => {
                                    products = [...products.slice(0, index), ...products.slice(index + 1)];
                                    if(products.length == 1) {
                                        console.log('+');
                                        this.setState({
                                            fats: products[0].fats,
                                            calories: products[0].calories,
                                            carbohydrates: products[0].carbohydrates,
                                            squirrels: products[0].squirrels,
                                            names: products[0].name
                                        });
                                    }
                                    else {
                                        var fats, calories, carbohydrates, squirrels, names;
                                        
                                        for (let i = 0; i < products.length; i++) {
                                            if(i == 0) {
                                                console.log('0');
                        
                                                fats = products[0].fats
                                                calories = products[0].calories
                                                carbohydrates = products[0].carbohydrates
                                                squirrels = products[0].squirrels
                                                names = products[0].name
                                            } else {
                                                fats += ';' + products[i].fats
                                                calories += ';' + products[i].calories
                                                carbohydrates += ';' + products[i].carbohydrates
                                                squirrels +=  ';' +products[i].squirrels
                                                names = names + ';' + products[i].name;
                                            }
                                        }
                                        this.setState({
                                            fats: fats,
                                            calories: calories,
                                            carbohydrates: carbohydrates,
                                            squirrels: squirrels,
                                            names: names,
                                        });
                                    }
                                    this.forceUpdate();
                                }}>{item.name}</Cell>
                            )}
                        </List>}
                    </Group>
                </div>
                <FixedLayout filled vertical="bottom">
                    <Div>
                        <Button onClick={() => {
                            if(this.state.date == '' || this.state.time == '' || this.state.type == '' || this.state.names == '') return this.sendError('Не все поля были заполнены.');
                            this.api.AddEat({'type': this.state.type, 'name': this.state.names, 'time': this.state.time, 'date': this.state.date, 'fats': this.state.fats, 'calories': this.state.calories, 'carbohydrates': this.state.carbohydrates, 'protein': this.state.squirrels}).then(() => {
                                Time = '';
                                Data = '';
                                products = '';
                                Type = '';
                                goBack();
                            })
                        }} size="xl">Добавить прием пищи</Button>
                    </Div>
                </FixedLayout>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePanelAddEat);