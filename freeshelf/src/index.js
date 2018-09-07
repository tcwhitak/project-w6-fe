import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import request from 'superagent'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      books: []
    }
  }

  componentDidMount () {
    request.get('http://localhost:3001/books')
      .then(res => {
        this.setState({
          books: res.body
        })
      })
  }
  render () {
    return (
      <div className='App'>
        {this.state.books.map((book, idx) =>
          <div key={idx} className='book-wrapper'>
            <BookEntry
              key={book.id}
              title={book.title}
              author={book.author}
              shortDescription={book.shortDescription}
              cover={book.coverImageUrl}
              url={book.url}
              publisher={book.publisher}
              publicationDate={book.publicationDate}
              detailedDescription={book.detailedDescription}
            />
            <hr className='divider' />
          </div>
        )}
      </div>
    )
  }
}

class BookEntry extends Component {
  constructor (props) {
    super(props)
    this.state = {
      displayExtraInfo: false,
      imageError: false,
      editing: false
    }
  }

  showDetail (e) {
    // console.log('clicked', e)
    this.state.displayExtraInfo
      ? this.setState({
        displayExtraInfo: false
      })
      : this.setState({
        displayExtraInfo: true
      })
  }

  handleImageError (e) {
    this.setState({
      imageError: true
    })
  }

  startEdit (e) {
    console.log('edit started')
    this.setState({
      editing: true
    })
  }

  render () {
    return (
      <div className='bookEntry'>
        <div className='textContent'>
          <h2 className='title'>
            {this.props.title}
          </h2>
          <h4 className='author'>
            {this.props.author}
          </h4>
          <div className='shortDescription'>
            {this.props.shortDescription}
          </div>

          {this.state.displayExtraInfo ? (
            <div className='extraInfo'>
              <div className='buttons'>
                <a className='less button' onClick={(e) => this.showDetail(e)}>
                  less
                </a>
                <a className='edit button' onClick={(e) => this.startEdit(e)}>
                  edit
                </a>
              </div>
              <div className='url extraItem'>
                <span className='label'>URL: </span>
                {this.props.url}
              </div>
              <div className='publisher extraItem'>
                <span className='label'>Publisher: </span>
                {this.props.publisher}
              </div>
              <div className='publicationDate extraItem'>
                <span className='label'>Publication Date: </span>
                {this.props.publicationDate}
              </div>
              <div className='detailedDescription extraItem'>
                <span className='label'>Full Description: </span>
                {this.props.detailedDescription}
              </div>
            </div>
          )
            : <div className='buttons'>
              <a className='more button' onClick={(e) => this.showDetail(e)}>
              more
              </a>
              <a className='edit button' onClick={(e) => this.startEdit(e)}>
              edit
              </a>
            </div>
          }
        </div>

        <div className='cover-wrapper'>
          {!this.state.imageError ? (
            <img src={this.props.cover} alt='book cover' className='cover' onError={(e) => this.handleImageError(e)} />
          )
            : <img src='https://images.unsplash.com/photo-1460324558840-8df3143cd908?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=2105e1fa6f7c9032cbad3071886f2365&auto=format&fit=crop&w=668&q=80' alt='book cover' className='cover' />
          }

        </div>
      </div>
    )
  }
}
ReactDOM.render(<App />, document.getElementById('root'))
