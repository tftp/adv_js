function renderStyle(object){
  let string = '';
  for(const [key, value] of Object.entries(object)){
    string += `${key}:${value}; `
  }
  return string;
};

class HtmlElement {
  // _target - текущий DOM element в который будет произведена отрисовка
  // _render - Метод для отрисовки объекта
  _render(value){
    if (!value)
      return this._newDom.remove()

    if (!this._template)
      throw new Error('Template not set!')

    if (!this._target)
      throw new Error('Parrent node not set!')

    if (this._newDom)
      this._newDom.remove()

    this._template.includes('div') ? this._newDom = document.createElement('DIV') : this._newDom = document.createElement('INPUT');
    let context = this._template.replace('<div>','').replace('</div>','');
    if (this._variables)
      for(const [key, value] of Object.entries(this._variables)){
        context = context.replace(`{${key}}`, value);
      }
    this._newDom.style.cssText = this._style;
    this._newDom.innerText = context;
    this._target.append(this._newDom)
  }

  // setter template - задает шаблон в виде строки, механизм замены можно использовать любой, но очень желательно не использовать дата атрибуты
  set template(value){
      this._template = value
  }

  // setter variables - задает список переменных которые должны быть подставлены в шаблон,
  //если в свойстве передана строка - подставить ее, если функция - вызвать ее и подставить ее результат
  set variables(value){
    if(typeof(value) != 'object')
      throw new Error('It must be object!')

    this._variables = value
  }

  // setter target - Если передаем DOM элемент то записываем его в свойство _target, если нет - выводим сообщение об ошибке
  set target(value){
    if(!value.nodeName)
      throw new Error('It must be DOM element')

    this._target = value
  }

  // setter styles, позволяет передать стили в виде объекта и присвоить их в атрибут style
  set styles(value){
    if (typeof(value) != 'object')
      throw new Error('It must be object')

    this._style = renderStyle(value);
    if (this._newDom)
      this._newDom.style.cssText = this._style
  }

  // render() - вызывает _render
  render(){
    this._render(true)
  }

  // _unrender - удаляет созданный DOM element со страницы
  // unrender() - вызывает _render
  unrender(){
    this._render(false)
  }
};

class Input extends HtmlElement{
  // onInput, принимает функцию
  set onInput(value){
    if (typeof(value) != 'function')
      throw new Error('It is not a function!')

    if (!this._target)
      throw new Error('Target is not set!')

    this._target.addEventListener('input', value)
  }

  // onFocus, принимает функцию
  set onFocus(value){
    if (typeof(value) != 'function')
      throw new Error('It is not a function!')

    if (!this._target)
      throw new Error('Target is not set!')

    this._target.addEventListener('focus', value)

  }
}

class Div extends HtmlElement{
  // сеттер onClick, принимает функцию
  set onClick(value){
    if (typeof(value) != 'function')
      throw new Error('It is not a function!')

    if (!this._target)
      throw new Error('Target is not set!')

    this._target.addEventListener('click', value)
  }
};
