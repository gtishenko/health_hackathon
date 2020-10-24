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

class HomePanelAddDrink extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            time: '',
            type: '',
            date: '',
            names: '',
            carbohydrates: '',
            squirrels: '',
            fats: '',
            quantity: ''
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
            date = new Date();
            var minutes = date.getMinutes() > 10 ? date.getMinutes() : '0' + date.getMinutes();
            var hours = date.getHours() > 10 ? date.getHours() : '0' + date.getHours();
            var time = hours + ':' + minutes;
            this.setState({
                time: time
            });
        }
    }

    render() {
        const {id, setPage, colorScheme, openPopout, closePopout, goBack} = this.props;
        
        return (
            <Panel id={id}>
                <PanelHeader left={<PanelHeaderBack onClick={goBack} />}>Новый прием пищи</PanelHeader>
                <div style={{ marginBottom: 80 }}>
                    <FormLayout>
                        <FormLayoutGroup top="Дата принятия напитка">
                            <Input value={this.state.date} onChange={(e) => {
                                this.setState({
                                    date: e.target.value
                                });
                            }} type="date"/>
                        </FormLayoutGroup>
                        <FormLayoutGroup top="Время принятия напитка">
                            <Input value={this.state.time} onChange={(e) => {
                                this.setState({
                                    time: e.target.value
                                });
                            }} type="time"/>
                        </FormLayoutGroup>
                        <FormLayoutGroup top="Напиток">
                            <Select placeholder="Выберите напиток" value={this.state.type} onChange={(e) => {
                                this.setState({
                                    type: e.target.value
                                });
                            }}>
                                <option>Вода</option>
                                <option>Кофе</option>
                                <option>Сок</option>
                                <option>Молоко</option>
                            </Select>
                        </FormLayoutGroup>
                        <FormLayoutGroup top="Количество">
                            <Select placeholder="Выберите количество" value={this.state.quantity} onChange={(e) => {
                                this.setState({
                                    quantity: e.target.value
                                });
                            }}>
                                <option>200 мл - кружка</option>
                                <option>300 мл - стакан</option>
                            </Select>
                        </FormLayoutGroup>
                    </FormLayout>
                    
                </div>
                <FixedLayout filled vertical="bottom">
                    <Div>
                        <Button onClick={() => {
                            if(this.state.date == '' || this.state.time == '' || this.state.type == '' || this.state.quantity == '') return this.sendError('Не все поля были заполнены.');
                            var quantity = this.state.quantity == '200 мл - кружка' ? 200 : 300;
                            this.api.AddDrink({'name': '1', 'type': this.state.type, 'time': this.state.time, 'date': this.state.date, 'quantity': quantity}).then(() => {
                                goBack();
                            })
                        }} size="xl">Добавить прием напитка</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePanelAddDrink);