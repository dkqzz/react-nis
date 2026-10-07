import { Component } from 'react'

class ErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Ошибка списка товаров', error, errorInfo)
  }

  handleRetry = () => {
    this.setState({ hasError: false })
  }

  render() {
    if (this.state.hasError) {
      return (
        <section className="error-state" role="alert">
          <p>Не удалось загрузить список товаров.</p>
          <button type="button" onClick={this.handleRetry}>
            Повторить
          </button>
        </section>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
