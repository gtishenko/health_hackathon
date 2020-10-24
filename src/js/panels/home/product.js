import React from 'react';
import {connect} from 'react-redux';
import bridge from '@vkontakte/vk-bridge';

import {closePopout, goBack, openModal, openPopout, setPage, setStory} from '../../store/router/actions';

import {Squirrels, Name, Fats, Carbohydrates, Calories} from './selectProduct';

import Icon16Done from '@vkontakte/icons/dist/16/done';
import Icon16Cancel from '@vkontakte/icons/dist/16/cancel';
import Icon56InfoOutline from '@vkontakte/icons/dist/56/info_outline';

import {
    Div,
    Panel,
    PanelHeader,
    PanelHeaderBack,
    PanelHeaderContent,
    Input,
    FormLayout,
    FormLayoutGroup,
    Button,
    Spinner,
    PanelSpinner,
    Snackbar,
    Avatar,
    Placeholder,
    Footer
} from "@vkontakte/vkui";

var SquirrelsExport, NameExport, FatsExport, CarbohydratesExport, CaloriesExport;

const blueBackground = {
  backgroundColor: 'var(--accent)'
};

class HomePanelProduct extends React.Component {

  constructor(props) {
      super(props);

      this.state = {
        value: '100',
        squirrels: Squirrels,
        carbohydrates: Carbohydrates,
        fats: Fats,
        calories: Calories,
        loaderInButton: false,
        snackbar: null,
        alreadyAdded: false,
        internetError: false,
      };
    this.onChange = this.onChange.bind(this);
    this.addToCalc = this.addToCalc.bind(this);
  }
  
  onChange (e) {
    var value = e.target.value.replace(/[^+\d]/g, '').replace('+','').replace('-','').substring(0,4);
    this.setState({ 
      value: value,
      squirrels: Squirrels/100*value,
      carbohydrates: Carbohydrates/100*value,
      fats: Fats/100*value,
      calories: Calories/100*value,
    });
  }

  async addToCalc() {
    if(this.state.value == '') {
      this.setState({ snackbar:
        <Snackbar
          layout="vertical"
          onClose={() => this.setState({ snackbar: null })}
          before={<Avatar size={24} style={{ backgroundColor: '#ff0000' }}><Icon16Cancel fill="#fff" width={14} height={14} /></Avatar>}
        >
          Вы ничего не ввели в поле.
        </Snackbar>
      });
      return;
    }
    if(parseInt(this.state.value) == 0) {
      this.setState({ snackbar:
        <Snackbar
          layout="vertical"
          onClose={() => this.setState({ snackbar: null })}
          before={<Avatar size={24} style={{ backgroundColor: '#ff0000' }}><Icon16Cancel fill="#fff" width={14} height={14} /></Avatar>}
        >
          Число должно быть больше нуля.
        </Snackbar>
      });
      return;
    }
    SquirrelsExport = this.state.squirrels;
    FatsExport = this.state.fats;
    NameExport = Name;
    CarbohydratesExport = this.state.carbohydrates;
    CaloriesExport = this.state.calories;
    this.props.goBack();
    this.props.goBack();
    this.props.goBack();
  }

  async componentDidMount() {
      SquirrelsExport = undefined;
      FatsExport = undefined;
      NameExport = undefined;
      CarbohydratesExport = undefined;
      CaloriesExport = undefined;
  }

    render() {
        const {id, setPage, withoutEpic, setStory, goBack} = this.props;

        console.log(this.state.alreadyAdded);
        

        return (
            <Panel id={id}>
                <PanelHeader left={<PanelHeaderBack style={{ cursor: 'pointer' }} onClick={() => goBack()} />}><PanelHeaderContent
                  status={Name}
                  >
                    Калории
                  </PanelHeaderContent></PanelHeader>
                  {this.state.internetError && !this.state.loader && <Placeholder
                   icon={<Icon56InfoOutline />}
                   action={<Button size="l" onClick={() => this.reloadPage()} mode="tertiary">Повторить попытку</Button>}
                   stretched
                 >
                   Произошла ошибка при попытке подключения. Проверьте интернет-соединение или повторите попытку позже.
                 </Placeholder>}
                 {!this.state.internetError && <>
                    <Div>
                    <table style={{ textAlign: 'center', width: '100%', userSelect: 'none', marginTop: 12 }}>
                      <tr>
                        <th>Белки</th>
                        <th>Углеводы</th>
                        <th>Жиры</th>
                        <th>Калории</th>
                      </tr>
                      <tr>
                        <td>{this.state.squirrels.toFixed(2)}</td>
                        <td>{this.state.carbohydrates.toFixed(2)}</td>
                        <td>{this.state.fats.toFixed(2)}</td>
                        <td>{this.state.calories.toFixed(2)}</td>
                      </tr>
                    </table>
                  </Div>
                  <Div>
                    <FormLayout>
                      <FormLayoutGroup top="Количество грамм продукта">
                        <Input inputMode="tel" onChange={this.onChange} type="num" min="0" maxLength="4" defaultValue="100" value={this.state.value} /> 
                      </FormLayoutGroup>
                    </FormLayout>
                  </Div>{!this.state.alreadyAdded && <Div><Button style={{ height: 45, cursor: 'pointer' }} disabled={this.state.loaderInButton} onClick={() => this.addToCalc()} size="xl">{this.state.loaderInButton ? <Spinner/>  : 'Добавить в список'}</Button></Div>}
                  </>}
                  {this.state.snackbar}
            </Panel>
        );
    }

}

const mapDispatchToProps = {
    setStory,
    setPage,
    goBack,
    openPopout,
    closePopout,
    openModal
};

export default connect(null, mapDispatchToProps)(HomePanelProduct);
export var CaloriesExport, CarbohydratesExport, FatsExport, NameExport, SquirrelsExport;