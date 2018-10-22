import ReactDOM from 'react-dom';
import React from 'react';

import News from './components/News.jsx';
import Add from './components/Add.jsx';


class App extends React.Component {
  state = {
    news: null,
    isLoading: false,
  };
  
  handleAddNews = (data) => {
    const nextNews = [data, ...this.state.news];
    this.setState({ news: nextNews });
  };


  static getDerivedStateFromProps(props, state) {
    let nextFilteredNews;

    if (Array.isArray(state.news)) {
      nextFilteredNews = [...state.news];

      nextFilteredNews.forEach((item, index) => {
        if (item.bigText.toLowerCase().indexOf('pubg') !== -1) {
          item.bigText = 'СПАМ';
        }
      })

      return {
        filteredNews: nextFilteredNews,
      }
    }

    return null;
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    const data = [
      {
        id: 1,
        author: 'Саша Печкин',
        text: 'В четверг, четвертого числа...',
        bigText: 'в четыре с четвертью часа четыре чёрненьких чумазеньких чертёнка чертили чёрными чернилами чертёж.'
      },
      {
        id: 2,
        author: 'Просто Вася',
        text: 'Считаю, что $ должен стоить 35 рублей!',
        bigText: 'А евро 42!'
      },
      {
        id: 3,
        author: 'Max Frontend',
        text: 'Прошло 2 года с прошлых учебников, а $ так и не стоит 35',
        bigText: 'А евро опять выше 70.'
      },
      {
        id: 4,
        author: 'Гость',
        text: 'Бесплатно. Без смс, про реакт, заходи - https://maxpfrontend.ru',
        bigText: 'Еще есть группа VK, telegram и канал на youtube! Вся инфа на сайте, не реклама!'
      }
    ];

    setTimeout(() => {
      this.setState({ isLoading: false, news: data })
    }, 1500);
  }

  render() {
    const { news, isLoading } = this.state 

    return (
      <React.Fragment>
        <Add onAddNews={this.handleAddNews} />
        <h3>Новости</h3>
        {isLoading && <p>Загружаю...</p>}
        {Array.isArray(news) && <News data={news} />}
      </React.Fragment>
    )
  }

}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
