import image1 from '../assets/signs/images.jpg'
import image2 from '../assets/signs/cut.jpg'
import image3 from '../assets/signs/thumb.jpg'
import image4 from '../assets/signs/how.png'
import image5 from '../assets/signs/are.png'
import image6 from '../assets/signs/you.png'
import image7 from '../assets/signs/pic.jpg'

import a from '../assets/signs/alphabets/a.jpg'
import b from '../assets/signs/alphabets/b.jpg'
import c from '../assets/signs/alphabets/c.jpg'
import d from '../assets/signs/alphabets/d.jpg'
import e from '../assets/signs/alphabets/e.jpg'
import f from '../assets/signs/alphabets/f.jpg'
import g from '../assets/signs/alphabets/g.jpg'
import h from '../assets/signs/alphabets/h.jpg'
import i from '../assets/signs/alphabets/i.jpg'
import j from '../assets/signs/alphabets/j.jpg'
import k from '../assets/signs/alphabets/k.jpg'
import l from '../assets/signs/alphabets/l.jpg'
import m from '../assets/signs/alphabets/m.jpg'
import n from '../assets/signs/alphabets/n.jpg'
import o from '../assets/signs/alphabets/o.jpg'
import p from '../assets/signs/alphabets/p.jpg'
import q from '../assets/signs/alphabets/q.jpg'
import r from '../assets/signs/alphabets/r.jpg'
import s from '../assets/signs/alphabets/s.jpg'
import t from '../assets/signs/alphabets/t.jpg'
import u from '../assets/signs/alphabets/u.jpg'
import v from '../assets/signs/alphabets/v.jpg'
import w from '../assets/signs/alphabets/w.jpg'
import x from '../assets/signs/alphabets/x.jpg'
import y from '../assets/signs/alphabets/y.jpg'
import z from '../assets/signs/alphabets/z.jpg'

import monday from '../assets/signs/weekdays/monday.png'
import tuesday from '../assets/signs/weekdays/tuesday.png'
import wednesday from '../assets/signs/weekdays/wednesday.png'
import thursday from '../assets/signs/weekdays/thursday.png'
import friday from '../assets/signs/weekdays/friday.png'
import saturday from '../assets/signs/weekdays/saturday.png'
import sunday from '../assets/signs/weekdays/sunday.png'
import monday_a from '../assets/signs/weekdays/monday_a.png'
import tuesday_a from '../assets/signs/weekdays/tuesday_a.png'
import wednesday_a from '../assets/signs/weekdays/wednesday_a.png'
import thursday_a from '../assets/signs/weekdays/thursday_a.png'
import friday_a from '../assets/signs/weekdays/friday_a.png'
import saturday_a from '../assets/signs/weekdays/saturday_a.png'
import sunday_a from '../assets/signs/weekdays/sunday_a.png'

export const images = [
    {names:['monday'], image:monday, isVerb:false, languages:['South African']},
    {names:['tuesday'], image:tuesday, isVerb:false, languages:['South African']},
    {names:['wednesday'], image:wednesday, isVerb:true, languages:['South African']},
    {names:['thursday'], image:thursday, isVerb:false, languages:['South African']},
    {names:['friday'], image:friday, isVerb:false, languages:['South African']},
    {names:['saturday'], image:saturday, isVerb:true, languages:['South African']},
    {names:['sunday'], image:sunday, isVerb:true, languages:['South African']},
    {names:['monday'], image:monday_a, isVerb:false, languages:['American']},
    {names:['tuesday'], image:tuesday_a, isVerb:false, languages:['American']},
    {names:['wednesday'], image:wednesday_a, isVerb:true, languages:['American']},
    {names:['thursday'], image:thursday_a, isVerb:false, languages:['American']},
    {names:['friday'], image:friday_a, isVerb:false, languages:['American']},
    {names:['saturday'], image:saturday_a, isVerb:true, languages:['American']},
    {names:['sunday'], image:sunday_a, isVerb:true, languages:['American']},
    {names:['cut', 'cutting'], image:image2, isVerb:true, languages:['South African', 'American']},
    {names:['finger','kick'], image:image3, isVerb:true, languages:['South African', 'American']},
    {names:['how'], image:image4, isVerb:false,languages:['South African', 'American']},
    {names:['are'], image:image5, isVerb:false,languages:['South African', 'American']},
    {names:['you'], image:image6, isVerb:false,languages:['South African', 'American']},
    {names:['happy'], image:a, isVerb:false,languages:['South African', 'American']},
    //{names:['i love you'], image:image7, isVerb:false,languages:['South African', 'American']},
]

export const alphabetsImages = [
    {name:'a', image:a,languages:['South African', 'American']},
    {name:'b', image:b,languages:['South African', 'American']},
    {name:'c', image:c,languages:['South African', 'American']},
    {name:'d', image:d,languages:['South African', 'American']},
    {name:'e', image:e,languages:['South African', 'American']},
    {name:'f', image:f,languages:['South African', 'American']},
    {name:'g', image:g,languages:['South African', 'American']},
    {name:'h', image:h,languages:['South African', 'American']},
    {name:'i', image:i,languages:['South African', 'American']},
    {name:'j', image:j,languages:['South African', 'American']},
    {name:'k', image:k,languages:['South African', 'American']},
    {name:'l', image:l,languages:['South African', 'American']},
    {name:'m', image:m,languages:['South African', 'American']},
    {name:'n', image:n,languages:['South African', 'American']},
    {name:'o', image:o,languages:['South African', 'American']},
    {name:'p', image:p,languages:['South African', 'American']},
    {name:'q', image:q,languages:['South African', 'American']},
    {name:'r', image:r,languages:['South African', 'American']},
    {name:'s', image:s,languages:['South African', 'American']},
    {name:'t', image:t,languages:['South African', 'American']},
    {name:'u', image:u,languages:['South African', 'American']},
    {name:'v', image:v,languages:['South African', 'American']},
    {name:'w', image:w,languages:['South African', 'American']},
    {name:'x', image:x,languages:['South African', 'American']},
    {name:'y', image:y,languages:['South African', 'American']},
    {name:'z', image:z,languages:['South African', 'American']},
]


export const conjunctionsImages = [
    {name:'and', image:image5,languages:['South African', 'American']},
    {name:'but', image:image6,languages:['South African', 'American']},
    {name:'because', image:image7,languages:['South African', 'American']},
    {name:'yet', image:image7,languages:['South African', 'American']},
    {name:'while', image:image2,languages:['South African', 'American']},
    {name:'whomever', image:image5,languages:['South African', 'American']},
    {name:'whereas', image:image5,languages:['South African', 'American']},
    {name:'whatever', image:image1,languages:['South African', 'American']},
    {name:'whoever', image:image6,languages:['South African', 'American']},
    {name:'ultimately', image:image7,languages:['South African', 'American']},
    {name:'thus', image:image7,languages:['South African', 'American']},
    {name:'therefore', image:image3,languages:['South African', 'American']},
    {name:'thereafter', image:image7,languages:['South African', 'American']},
    {name:'then', image:image7,languages:['South African', 'American']},
    {name:'still', image:image4,languages:['South African', 'American']},
    {name:'such as', image:image5,languages:['South African', 'American']},
    {name:'meanwhile', image:image6,languages:['South African', 'American']},
    {name:'moreover', image:image7,languages:['South African', 'American']},
    {name:'nevertheless', image:image7,languages:['South African', 'American']},
    {name:'now', image:image2,languages:['South African', 'American']},
    {name:'nor', image:image5,languages:['South African', 'American']},
    {name:'or', image:image1,languages:['South African', 'American']},
    {name:'since', image:image6,languages:['South African', 'American']},
    {name:'so', image:image7,languages:['South African', 'American']},
    {name:'hence', image:image3,languages:['South African', 'American']},
    {name:'however', image:image7,languages:['South African', 'American']},
    {name:'in fact', image:image1,languages:['South African', 'American']},
    {name:'in short', image:image6,languages:['South African', 'American']},
    {name:'in spite of', image:image7,languages:['South African', 'American']},
    {name:'in spite of', image:image3,languages:['South African', 'American']},
    {name:'also', image:image7,languages:['South African', 'American']},
    {name:'besides', image:image7,languages:['South African', 'American']},
    {name:'briefly', image:image3,languages:['South African', 'American']},
    {name:'consequently', image:image7,languages:['South African', 'American']},
    {name:'finally', image:image3,languages:['South African', 'American']},
    {name:'equally', image:image7,languages:['South African', 'American']},
    {name:'equally at', image:image7,languages:['South African', 'American']},
    {name:'after', image:image7,languages:['South African', 'American']},
]

export const punctuationMarks = [
    {name:".", image:image1,languages:['South African', 'American']},
    {name:",", image:image2,languages:['South African', 'American']},
    {name:"?", image:image3,languages:['South African', 'American']},
    {name:"!", image:image4,languages:['South African', 'American']},
    //{name:"'", image:image5},
]