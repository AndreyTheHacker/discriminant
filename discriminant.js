// Решатель полных квадратных уравнений
// Сделан Андреем Павленко
// Для достоверности решите 2x^2+3x+1=0 самостоятельно
// x^2 - это x в квадрате

var equation = "2x^2+3x+1=0"

// Нужно найти a,b и c
// Использовать дискриминант
// Вывести корни

function OnStart() // для DroidScript
{
	alert(solve(equation))
}


function solve(eq) {
    _ = getabc(eq)
    __ = compute_D(_)
    ___ = get_roots(__,_)
    return ___
}

function getabc(q) // находим a,b и c
{
  apos = q.indexOf("x^2") //ищем a
  adata = new String(q) //переобразуем формулу в точную строку
  adata = adata.split("") //превращаем в массив с символами
  adata.splice(apos,q.length) // вырезаем лишнее
  adata=(adata==""?1:(adata=="-"?-1:adata)) // проверка на "пустой x"и на отрицательный x, то есть если перед x ничего не стоит, мы подразумеваем, что стоит 1 и если перед иксом - то подразумеваем, что стоит -1
  adata = new Number(adata!=1?(adata!=-1?adata.join(""):-1):1) // проверяем и обратно в число и мы нашли a
  a = adata
  // apos - это где начинается x^2 поэтому перешагнем 3 символа
  // и найдем b
  bdata = new String(q) // резервируем строку
  bdata = bdata.split("") // в массив
  bdata = bdata.splice(apos+3,q.length) // да, да не удивляйтесь, функция splice всегда возвратит то, что вырезала
  bdata = bdata.join("") // в строку
  bpos = bdata.indexOf("x"); // находим b 
  bdata = bdata.split("") // в массив
  bdata.splice(bpos,q.length) // вырезаем часть уравнения
  if(bdata[0]=="+") { // если в начале стоит "+", то вырезаем его
    bdata.shift() // функция "убрать в начале"
  }
  bdata=(bdata==""?1:(bdata=="-"?-1:bdata)) // точно так же как и в а
  b = new Number(bdata!=1?(bdata!=-1?bdata.join(""):-1):1) // в число 
  
  // и наконец-то найдём c
  cdata = new String(q) //резервируем строку
  cdata = cdata.split("") //в массив
  cdata = cdata.splice(apos+bpos+4,q.length) //отрезаем
  cdata.pop() // с конца убираем
  cdata.pop() // с конца убираем, и мы убрали "=0"
  c = new Number(cdata.join("")) // в число
  delete cdata
  delete bdata
  delete adata
	return [a,b,c] //кладём всё в массив и функция вернёт массив.
}

function compute_D(abc) //вычисляем дискриминант
{
	// Со школьной скамьи мы знаем, что формула дискриминанта такая:
  // D = b^2 - 4ac
  // А так же мы знаем, что от дискриминанта зависит количество корней
  // D > 0 ; 2 корня
  // D = 0 ; 1 корень
  // D < 0 ; нет корней / нет решения

  var D = (abc[1]*abc[1]) - 4*abc[0]*abc[2] // ну как-то так
  if(D>0) {
    roots = 2
  }else if(D==0) {
    roots=1
  }else if(D<0) {
    roots=0
  } //так мы вычисляем кол-во корней
  return [D,roots] //мы возвращаем дискриминант и кол-во корней
}

function get_roots(a,abc) // Ищем корни
{
	// Мы знаем, что если 2 корня, то формулы корней будут выглядеть так:
  //          -b+√D
  // x1 = ------------
  //             2a
  //         и
  //          -b-√D
  // x2 = ------------
  //             2a
  //
  // Для одного корня:
  //         -b
  // x = --------
  //         2a
  //
  // А если нет корней, то нет решения

  if(a[1]==2) { // два корня
    x1 = (-b+Math.sqrt(a[0]))/(2*abc[0])
    x2 = (-b-Math.sqrt(a[0]))/(2*abc[0])
    return [x1,x2]
  }
  
  if(a[1]==1) {
    x = -b/(2*abc[0])
    return x
  }
  
if(a[0]==0) return "Нет решений"
}