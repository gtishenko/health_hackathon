import React from 'react';
import {connect} from 'react-redux';

import {closePopout, goBack, openModal, openPopout, setPage} from '../../store/router/actions';

import light1 from './../../../image/light1.png';
import breakfast from './../../../image/breakfast.png';
import water from './../../../image/water.png';
import coffee1 from './../../../image/coffee1.png';
import milk1 from './../../../image/milk1.png';
import juice1 from './../../../image/juice1.png';

import queryString from 'query-string';
import API from './../../../API/API';
import Icon16Done from '@vkontakte/icons/dist/16/done';
import Icon16Cancel from '@vkontakte/icons/dist/16/cancel';
import Icon56EventOutline from '@vkontakte/icons/dist/56/event_outline';
import Icon28MoreHorizontal from '@vkontakte/icons/dist/28/more_horizontal';

import {
    Panel,
    Gallery,
    FixedLayout,
    Div,
    Button,
    Text,
    PanelHeader,
    PanelSpinner,
    Snackbar,
    Avatar,
    Banner,
    Select,
    FormLayout,
    FormLayoutGroup,
    Input,
    InfoRow,
    SimpleCell,
    Header,
    Link,
    RichCell,
    Placeholder
} from "@vkontakte/vkui";

var ownerID;

var slideIndex = 0;


var idVK;

var cityID, address, voting = false, city;

var Flat;

var trainings = [
    {name: 'Стройные руки и корпус', description: <div>Нужно придумать краткое<br/>описание</div>, backgroundImage: 'https://psv4.userapi.com/c856232/u217316142/docs/d16/8db14f225718/Group_9.png?extra=luFDpF0fN54JGkZT1UKWR358dbcUsZVOYWnxSCKBoq3Avg3bZ1vndAZ7ejGgcONLYs1XYU2dVaVWCDOCRrd3vtYdYSLK2cw5cLv4s29eoWoIvUEQTT0l-hkQIOYrgsa_5hm-8Zy81PJfMyDrjRxq4tU'},
    {name: 'Стройные руки и корпус', description: <div>Нужно придумать краткое<br/>описание</div>, backgroundImage: 'https://psv4.userapi.com/c856232/u217316142/docs/d16/8db14f225718/Group_9.png?extra=luFDpF0fN54JGkZT1UKWR358dbcUsZVOYWnxSCKBoq3Avg3bZ1vndAZ7ejGgcONLYs1XYU2dVaVWCDOCRrd3vtYdYSLK2cw5cLv4s29eoWoIvUEQTT0l-hkQIOYrgsa_5hm-8Zy81PJfMyDrjRxq4tU'},
];

var eats = [
];

var drinks = [
];

class HomePanelBase extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            slideIndex: slideIndex,
            theme: '',
            device: '',
            notRegistered: false,
            loader: true,
            snackbar: null,
            sex: '',//пол
            age: '',//возраст
            weight: '',//вес
            height: '',//рост

            registration: false,//включена ли регистрация
            result: false,//включен ли результат

            date: ''//дата текущая
        };

        this.api = new API();
    }

    async componentDidMount() {
        var params = queryString.parse(window.location.search);

        this.setState({
            device: params.vk_platform
        });

        await this.api.GetUser().then((data) => {
            if(data.height == null) {
                this.setState({
                    registration: true
                });
                if(data.sex == 2) {
                    this.setState({
                        sex: 'Мужской'
                    })
                }
                else if(data.sex == 1) {
                    this.setState({
                        sex: 'Женский'
                    })
                }
                /*if(data.age != null) {
                    this.setState({
                        sex: 'Мужской'
                    })
                }
                else if(data.sex == 1) {
                    this.setState({
                        sex: 'Женский'
                    })
                }*/
            } else {
                this.setState({
                    registration: false
                });
            }
        });

        var date = new Date();
        var day = date.getDate() > 10 ? date.getDate() : '0' + date.getDate();
        var month = date.getMonth() > 10 ? date.getMonth() : '0' + date.getMonth();
        date = date.getFullYear() + '-' + month + '-' + day;

        await this.api.getEatStatByDay(date).then((response) => {
            eats = response;
        });

        await this.api.getDrinkStatByDay(date).then((response) => {
            drinks = response;
        });
        this.forceUpdate();

        for (let i = 0; i < eats.length; i++) {
            if(eats[i].type == 'Завтрак') eats[i].img = breakfast;
        }

        for (let i = 0; i < drinks.length; i++) {
            if(drinks[i].type == 'Вода') drinks[i].img = water;
            if(drinks[i].type == 'Кофе') drinks[i].img = coffee1;
            if(drinks[i].type == 'Сок') drinks[i].img = juice1;
            if(drinks[i].type == 'Молоко') drinks[i].img = milk1;
        }

        var d = new Date();
        var day, month, dateOfMonth;
        day = d.getDay();
        month = d.getMonth();
        dateOfMonth = d.getDate();
        switch (day) {
            case 0:
                day = 'Воскресенье, '
                break;
            case 1:
                day = 'Понедельник, '
                break;
            case 2:
                day = 'Вторник, '
                break;
            case 3:
                day = 'Среда, '
                break;
            case 4:
                day = 'Четверг, '
                break;
            case 5:
                day = 'Пятница, '
                break;
            case 6:
                day = 'Суббота, '
                break;
            
        }
        switch (month) {
            case 0:
                this.setState({
                    date: day + dateOfMonth + ' января'
                });
                break;
            case 1:
                this.setState({
                    date: day + dateOfMonth + ' февраля'
                });
                break;
            case 2:
                this.setState({
                    date: day + dateOfMonth + ' марта'
                });
                break;
            case 3:
                this.setState({
                    date: day + dateOfMonth + ' апреля'
                });
                break;
            case 4:
                this.setState({
                    date: day + dateOfMonth + ' мая'
                });
                break;
            case 5:
                this.setState({
                    date: day + dateOfMonth + ' июня'
                });
                break;
            case 6:
                this.setState({
                    date: day + dateOfMonth + ' июля'
                });
                break;
            case 7:
                this.setState({
                    date: day + dateOfMonth + ' августа'
                });
                break;
            case 8:
                this.setState({
                    date: day + dateOfMonth + ' сентября'
                });
                break;
            case 9:
                this.setState({
                    date: day + dateOfMonth + ' октября'
                });
                break;
            case 10:
                this.setState({
                    date: day + dateOfMonth + ' ноября'
                });
                break;
            case 11:
                this.setState({
                    date: day + dateOfMonth + ' декабря'
                });
                break;
            default:
                this.setState({
                    date: day + dateOfMonth + ' января'
                });
                break;
            
        }
        this.setState({ loader: false });
    }

    render() {
        const {id, setPage, colorScheme, openPopout, closePopout} = this.props;

        var marginTop;
        if(this.state.device == 'desktop_web') marginTop = 15;
        else marginTop = 90;

        var disabled = false;
        if((this.state.city == '' || this.state.address == '') && this.state.slideIndex == 2) disabled = true;
        else disabled = false;
        
        return (
            <Panel id={id}>
                {this.state.loader ? <PanelSpinner/> : <>
                {this.state.registration && this.state.slideIndex == 3 && <PanelHeader>Давайте знакомиться!</PanelHeader>}
                {this.state.result && <PanelHeader>Результат</PanelHeader>}
                {!this.state.registration && !this.state.result && <PanelHeader>{this.state.date}</PanelHeader>}
                {this.state.registration && <><Gallery
                    slideWidth="100%"
                    style={{ height: window.innerHeight-15 }}
                    bullets={false}
                    slideIndex={this.state.slideIndex}
                    onChange={(index) => {
                        this.setState({ slideIndex: index });
                        slideIndex = index;
                    }}
                >
                    <div style={{ textAlign: "center", marginTop: marginTop }}>
                        <img style={this.state.device != 'desktop_web' ? { width: '70%' } : { width: '30%' }} src={light1}/>
                        <h1>Встречайте <br/><span className="pink">Здоровье</span> ВКонтакте</h1>
                        <Text>Текст описание</Text>
                    </div>
                    <div style={{ textAlign: "center", marginTop: marginTop }}>
                        <img style={this.state.device != 'desktop_web' ? { width: '70%' } : { width: '30%' }} src={light1}/>
                        <h1>Название слайда</h1>
                        <Text>Текст описание</Text>
                    </div>
                    <div style={{ textAlign: "center", marginTop: marginTop }}>
                        <img style={this.state.device != 'desktop_web' ? { width: '70%' } : { width: '30%' }} src={light1}/>
                        <h1>Название слайда</h1>
                        <Text>Текст описание</Text>
                    </div>
                    <div>
                        <FormLayout>
                            <FormLayoutGroup top="Пол">
                                <Select value={this.state.sex} onChange={(e) => {
                                    this.setState({
                                        sex: e.target.value
                                    });
                                }} placeholder="Выберите свой пол">
                                    <option>Мужской</option>
                                    <option>Женский</option>
                                </Select>
                            </FormLayoutGroup>
                            <FormLayoutGroup top="Возраст">
                                <Input value={this.state.age} onChange={(e) => {
                                    this.setState({
                                        age: e.target.value
                                    });
                                }} inputMode="numeric" maxLength={3} placeholder="Введите свой возраст"/>
                            </FormLayoutGroup>
                            <FormLayoutGroup top="Рост">
                                <Input value={this.state.height} onChange={(e) => {
                                    this.setState({
                                        height: e.target.value
                                    });
                                }} inputMode="numeric" maxLength={3} placeholder="Введите свой рост"/>
                            </FormLayoutGroup>
                            <FormLayoutGroup top="Вес">
                                <Input value={this.state.weight} onChange={(e) => {
                                    this.setState({
                                        weight: e.target.value
                                    });
                                }} inputMode="numeric" maxLength={3} placeholder="Введите свой вес"/>
                            </FormLayoutGroup>
                        </FormLayout>
                    </div>
                </Gallery>
                <FixedLayout vertical="bottom">
                    <Div><Button style={{ backgroundColor: '#FFA1A1' }} onClick={() => {
                        if(this.state.slideIndex == 3) {
                            console.log('+');
                            if(this.state.sex == '') {
                                if (this.state.snackbar) return;
                                this.setState({ snackbar:
                                <Snackbar
                                    layout="vertical"
                                    onClose={() => this.setState({ snackbar: null })}
                                    before={<Avatar size={24} style={{ backgroundColor: '#ff0000' }}><Icon16Cancel fill="#fff" width={14} height={14} /></Avatar>}
                                >
                                    Вы не выбрали свой пол
                                </Snackbar>
                                });
                                return;
                            }
                            else if(this.state.age == '') {
                                if (this.state.snackbar) return;
                                this.setState({ snackbar:
                                <Snackbar
                                    layout="vertical"
                                    onClose={() => this.setState({ snackbar: null })}
                                    before={<Avatar size={24} style={{ backgroundColor: '#ff0000' }}><Icon16Cancel fill="#fff" width={14} height={14} /></Avatar>}
                                >
                                    Вы не заполнили поле "Возраст"
                                </Snackbar>
                                });
                                return;
                            }
                            else if(this.state.height == '') {
                                if (this.state.snackbar) return;
                                this.setState({ snackbar:
                                <Snackbar
                                    layout="vertical"
                                    onClose={() => this.setState({ snackbar: null })}
                                    before={<Avatar size={24} style={{ backgroundColor: '#ff0000' }}><Icon16Cancel fill="#fff" width={14} height={14} /></Avatar>}
                                >
                                    Вы не заполнили поле "Рост"
                                </Snackbar>
                                });
                                return;
                            }
                            else if(this.state.weight == '') {
                                if (this.state.snackbar) return;
                                this.setState({ snackbar:
                                <Snackbar
                                    layout="vertical"
                                    onClose={() => this.setState({ snackbar: null })}
                                    before={<Avatar size={24} style={{ backgroundColor: '#ff0000' }}><Icon16Cancel fill="#fff" width={14} height={14} /></Avatar>}
                                >
                                    Вы не заполнили поле "Вес"
                                </Snackbar>
                                });
                                return;
                            }
                            this.setState({
                                registration: false,
                                result: true
                            })
                            if (this.state.snackbar) return;
                            this.setState({ snackbar:
                            <Snackbar
                                layout="vertical"
                                onClose={() => this.setState({ snackbar: null })}
                                before={<Avatar size={24} style={{ backgroundColor: 'var(--accent)' }}><Icon16Done fill="#fff" width={14} height={14} /></Avatar>}
                            >
                                Аккаунт успешно зарегистрирован!
                            </Snackbar>
                            });
                        } else {
                            this.setState({
                                slideIndex: this.state.slideIndex+1
                            });
                            slideIndex = this.state.slideIndex+1;
                        }
                    }} disabled={disabled} size="xl">Далее</Button></Div>
                </FixedLayout></>}
                {this.state.result && <>
                    <SimpleCell>
                        <InfoRow header="Индекс массы тела">
                            20.1 кг/м2
                        </InfoRow>
                    </SimpleCell>
                    <SimpleCell>
                        <InfoRow header="Категория">
                            Нормальная масса тела
                        </InfoRow>
                    </SimpleCell>
                    <SimpleCell>
                        <InfoRow header="Диапазон нормального веса">
                            59.9 … 81 кг
                        </InfoRow>
                    </SimpleCell>
                    <SimpleCell>
                        <InfoRow header="Примерная суточная норма калорий">
                            1900
                        </InfoRow>
                    </SimpleCell>
                    <SimpleCell>
                        <InfoRow header="Рекомендованная норма">
                            2 литра воды в день
                        </InfoRow>
                    </SimpleCell>
                    <FixedLayout vertical="bottom">
                    <Div><Button style={{ backgroundColor: '#FFA1A1' }} onClick={() => {
                        this.setState({
                            registration: false,
                            result: false
                        });
                        this.api.getEatStatByDay();
                    }} disabled={disabled} size="xl">Начать</Button></Div>
                </FixedLayout>
                </>}
                {!this.state.registration && !this.state.result && <>
                    <Banner
                        before={<Icon56EventOutline fill="#3F8AE0"/>}
                        header="Ежедневный отчёт"
                        subheader="Контролируйте свой вес, выпитый объем воды и количество калорий"
                        actions={<Button>Посмотреть</Button>}
                    />
                    <Header aside={<Link>Показать все</Link>}>Тренировки</Header>
                    {trainings.map((item, index) => 
                        <Banner
                            mode="image"
                            header={item.name}
                            subheader={item.description}
                            background={
                            <div
                                style={{
                                backgroundImage: 'url(' + item.backgroundImage + ')',
                                backgroundPosition: 'center',
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                                }}
                            />
                            }
                            actions={<Button mode="overlay_primary">Начать</Button>}
                        />
                    )}
                    <Header aside={<Link onClick={() => setPage('home','addEat')}>Добавить</Link>}>Приемы пищи за сегодня</Header>
                    {eats.map((item) => 
                        <RichCell
                            text={item.name.replace(/;/g, ', ')}
                            before={<img style={{ width: 72, marginRight: 12 }} src={item.img}/>}
                            after={<Icon28MoreHorizontal fill="#3F8AE0"/>}
                            caption={item.time}>
                            {item.type}
                        </RichCell>
                    )}
                    {eats.length == 0 && <Placeholder
                        header="Вы не добавили ни одного приема пищи"
                        action={<Button onClick={() => setPage('home','addEat')} size="l">Добавить прием пищи</Button>}>
                            Нажмите на кнопку ниже, чтобы исправить это</Placeholder>}
                    <Header aside={<Link onClick={() => setPage('home','addDrink')}>Добавить</Link>}>Питье за сегодня</Header>
                    {drinks.map((item) => 
                        <RichCell
                            text={item.quantity + ' мл.'}
                            before={<img style={{ width: 72, marginRight: 12 }} src={item.img}/>}
                            after={<Icon28MoreHorizontal fill="#3F8AE0"/>}
                            caption={item.time}>
                            {item.type}
                        </RichCell>
                    )}
                    {drinks.length == 0 && <Placeholder
                        header="Вы не добавили ни одного приема воды"
                        action={<Button onClick={() => setPage('home','addDrink')} size="l">Добавить питье</Button>}>
                            Нажмите на кнопку ниже, чтобы исправить это</Placeholder>}
                </>}
                </>}
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePanelBase);
export var ownerID;
export var idVK;
export var cityID;
export var address;
export var voting;
export var Flat;
export var city;