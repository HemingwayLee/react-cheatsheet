// function parseAscii(str) {
//   let ary = [];
//   str.trim().split("\n").forEach(line => {
//        line = line.trim();
//        if(line.startsWith("#") || line.length == 0) {
//          // do nothing; skip
//        } else {
//          values = line.split(/[ \t]+/);
//          ary.push(values);
//        }
//      });
//   return ary;
// }

// class Pixelart {
//   constructor(pixels, options) {
//     this.pixels = pixels;

//     this.colors = options.colors  || { '@': '#000000' }
//     this.offset = options.offset  || [0,0];

//     this.width  = pixels[0].length; // note: assume all rows the same for now
//     this.height = pixels.length;

//     console.log(`  width x height: ${this.width} x ${this.height}, offset: ${this.offset}`);
//    }

//   static parse(str, options) {
//     var pixels = parseAscii(str);
//     return new Pixelart(pixels, options);
//   }

//   draw(ctx, zoom=1) {
//     this.pixels.forEach((row, y) => {
//       row.forEach((pixel, x) => {
//         if (pixel != '.') {  // auto-skip transparent for now - why? why not?
//           ctx.fillStyle = this.colors[pixel];
//           ctx.fillRect(x*zoom+this.offset[0]*zoom, y*zoom+this.offset[1]*zoom, zoom, zoom);
//         }
//       });
//     });
//   }
// }

// function drawPunk(q, designs, zoom=1) {
//   // convenience helper / hack; lets you pass in id of canvas element
//   //   other assume canvas element passed in (use as is)
//   let canvas =  (typeof q === 'string') ?  document.querySelector(q) : q;

//   // note: use width/height from first design
//   canvas.width  = designs[0].width*zoom;
//   canvas.height = designs[0].height*zoom;

//   console.log(` canvas width x height: ${canvas.width} x ${canvas.height}`);
//   let ctx = canvas.getContext('2d');
//   for(let design of designs) {
//     design.draw(ctx, zoom);
//   }
// }

// ///////////////////////////
// // punk pixel art

// const alien_design = `
// ###
// # alien (male) - basic - zero attributes
// #
// #  colors:
// #   0 - transparent
// #   1 - black
// #
// #  size: 24x24

// . . . . . . . . . . . . . . . . . . . . . . . .
// . . . . . . . . . . . . . . . . . . . . . . . .
// . . . . . . . . . . . . . . . . . . . . . . . .
// . . . . . . . . . . . . . . . . . . . . . . . .
// . . . . . . . . . . . . . . . . . . . . . . . .
// . . . . . . . . @ @ @ @ @ @ @ . . . . . . . . .
// . . . . . . . @ ^ ^ ^ ^ ^ ^ ^ @ . . . . . . . .
// . . . . . . @ ^ ^ ^ ^ ^ ^ ^ ^ ^ @ . . . . . . .
// . . . . . . @ ^ ^ ^ ^ ^ ^ ^ ^ ^ @ . . . . . . .
// . . . . . . @ ^ ^ ^ ^ ^ ^ ^ ^ ^ @ . . . . . . .
// . . . . . . @ ^ ^ ^ ^ ^ ^ ^ ^ ^ @ . . . . . . .
// . . . . . @ @ ^ ^ x @ ^ ^ ^ x @ @ . . . . . . .
// . . . . @ ^ o ^ ^ @ o ^ ^ ^ @ o @ . . . . . . .
// . . . . . @ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ @ . . . . . . .
// . . . . . @ @ ^ ^ ^ ^ ^ o ^ ^ ^ @ . . . . . . .
// . . . . . . @ ^ ^ ^ ^ ^ o ^ ^ ^ @ . . . . . . .
// . . . . . . @ ^ ^ ^ ^ ^ o ^ ^ ^ @ . . . . . . .
// . . . . . . @ ^ ^ ^ ^ ^ ^ ^ ^ ^ @ . . . . . . .
// . . . . . . @ ^ ^ ^ @ @ @ @ @ ^ @ . . . . . . .
// . . . . . . @ ^ ^ ^ ^ ^ ^ ^ ^ ^ @ . . . . . . .
// . . . . . . @ ^ ^ ^ ^ ^ ^ ^ ^ @ . . . . . . . .
// . . . . . . @ ^ ^ ^ @ @ @ @ @ . . . . . . . . .
// . . . . . . @ ^ ^ ^ @ . . . . . . . . . . . . .
// . . . . . . @ ^ ^ ^ @ . . . . . . . . . . . . .
// `;

//   const alien = Pixelart.parse( alien_design, {
//                                  colors: {
//                                     '@':  '#000000',       // color 1 - black
//                                     'x':  '#75bdbd',       // color 2 - base 3  (darkest)
//                                     'o':  '#9be0e0',       // color 3 - base 2  (darker)
//                                     '^':  '#c8fbfb',       // color 4 - base 1
//                                   }} );


//   const ape_alien_design = `
//   . . . . . . . . . . . . . . . . . . . . . . . .
//   . . . . . . . . . . . . . . . . . . . . . . . .
//   . . . . . . . . . . . . . . . . . . . . . . . .
//   . . . . . . . . . . . . . . . . . . . . . . . .
//   . . . . . . . . . . . . . . . . . . . . . . . .
//   . . . . . . . . @ @ @ @ @ @ @ . . . . . . . . .
//   . . . . . . . @ x x x x x x x @ . . . . . . . .
//   . . . . . . @ x x ~ x x x x x x @ . . . . . . .
//   . . . . . . @ x ~ x x x x x x x @ . . . . . . .
//   . . . . . . @ x x @ @ @ @ @ @ x @ . . . . . . .
//   . . . . . . @ x ~ ~ ~ ~ ~ ~ ~ ~ @ . . . . . . .
//   . . . . . @ @ x ~ o @ ~ ~ ~ o @ @ . . . . . . .
//   . . . . @ x ^ x ~ @ ^ ~ ~ ~ @ ^ @ . . . . . . .
//   . . . . . @ x x ~ ~ ~ ~ ~ ~ ~ ~ @ . . . . . . .
//   . . . . . @ @ x ~ ~ ~ ~ ~ ~ ~ ~ @ . . . . . . .
//   . . . . . . @ x x ~ ~ ^ ~ ^ ~ ~ @ . . . . . . .
//   . . . . . . @ x x x ~ ~ ~ ~ ~ x @ . . . . . . .
//   . . . . . . @ x x ~ ~ ~ ~ ~ ~ ~ @ . . . . . . .
//   . . . . . . @ x @ ~ @ @ @ @ @ ~ @ . . . . . . .
//   . . . . . . @ x @ ~ ~ ~ ~ ~ ~ ~ @ . . . . . . .
//   . . . . . . @ x x @ ~ ~ ~ ~ ~ @ . . . . . . . .
//   . . . . . . @ x x x @ @ @ @ @ . . . . . . . . .
//   . . . . . . @ x x x @ . . . . . . . . . . . . .
//   . . . . . . @ x x x @ . . . . . . . . . . . . .
//   `;

//   const ape_alien = Pixelart.parse( ape_alien_design, {
//     colors: {
//        '@':  '#000000',
//        'x':  '#C8FBFB',
//        'o':  '#75BDBD',
//        '^':  '#9BE0E0',
//        '~':  '#F3FFFF',
//      }} );


//   const zombie_design = `
//   ###
//   # zombie (male) - basic - zero attributes
//   #
//   #  colors:
//   #   0 - transparent
//   #   1 - black
//   #
//   #  size: 24x24

//   . . . . . . . . . . . . . . . . . . . . . . . .
//   . . . . . . . . . . . . . . . . . . . . . . . .
//   . . . . . . . . . . . . . . . . . . . . . . . .
//   . . . . . . . . . . . . . . . . . . . . . . . .
//   . . . . . . . . . . . . . . . . . . . . . . . .
//   . . . . . . . . @ @ @ @ @ @ @ . . . . . . . . .
//   . . . . . . . @ o o o o o o o @ . . . . . . . .
//   . . . . . . @ o o ~ o o o o o o @ . . . . . . .
//   . . . . . . @ o ~ o o o o o o o @ . . . . . . .
//   . . . . . . @ o o o o o o o o o @ . . . . . . .
//   . . . . . . @ o o o o o o o o o @ . . . . . . .
//   . . . . . . @ o o x x o o o x x @ . . . . . . .
//   . . . . . @ o o o ^ @ o o o ^ @ @ . . . . . . .
//   . . . . . @ o o o x o o o o x o @ . . . . . . .
//   . . . . . @ @ o o o o o o o o o @ . . . . . . .
//   . . . . . . @ o o o o o @ @ o o @ . . . . . . .
//   . . . . . . @ o o o o o o o o o @ . . . . . . .
//   . . . . . . @ o o o o o o o o o @ . . . . . . .
//   . . . . . . @ o o o o @ @ @ o o @ . . . . . . .
//   . . . . . . @ o o o o x o o o o @ . . . . . . .
//   . . . . . . @ o o o o o o o o @ . . . . . . . .
//   . . . . . . @ o o o @ @ @ @ @ . . . . . . . . .
//   . . . . . . @ o o o @ . . . . . . . . . . . . .
//   . . . . . . @ o o o @ . . . . . . . . . . . . .
// `

// const zombie = Pixelart.parse( zombie_design, {
//   colors: {
//     '@':  '#000000',       // color 1 - black
//     'x':  '#5e7253',
//     'o':  '#7da269',
//     '^':  '#ff0000',
//     '~':  '#9bbc88',
//   }} );


//   const ape_zombie_design = `
//   . . . . . . . . . . . . . . . . . . . . . . . .
//   . . . . . . . . . . . . . . . . . . . . . . . .
//   . . . . . . . . . . . . . . . . . . . . . . . .
//   . . . . . . . . . . . . . . . . . . . . . . . .
//   . . . . . . . . . . . . . . . . . . . . . . . .
//   . . . . . . . . @ @ @ @ @ @ @ . . . . . . . . .
//   . . . . . . . @ x x x x x x x @ . . . . . . . .
//   . . . . . . @ x x ~ x x x x x x @ . . . . . . .
//   . . . . . . @ x ~ x x x x x x x @ . . . . . . .
//   . . . . . . @ x x @ @ @ @ @ @ x @ . . . . . . .
//   . . . . . . @ x ^ ^ ^ ^ ^ ^ ^ ^ @ . . . . . . .
//   . . . . . . @ x ^ o o ^ ^ ^ o o @ . . . . . . .
//   . . . . . @ x x ^ % @ ^ ^ ^ % @ @ . . . . . . .
//   . . . . . @ x x ^ o ^ ^ ^ ^ o ^ @ . . . . . . .
//   . . . . . @ @ x ^ ^ ^ ^ ^ ^ ^ ^ @ . . . . . . .
//   . . . . . . @ x x ^ ^ @ ^ @ ^ ^ @ . . . . . . .
//   . . . . . . @ x x x ^ ^ ^ ^ ^ x @ . . . . . . .
//   . . . . . . @ x x ^ ^ ^ ^ ^ ^ ^ @ . . . . . . .
//   . . . . . . @ x @ ^ @ @ @ @ @ ^ @ . . . . . . .
//   . . . . . . @ x @ ^ o ^ ^ ^ ^ ^ @ . . . . . . .
//   . . . . . . @ x x @ ^ ^ ^ ^ ^ @ . . . . . . . .
//   . . . . . . @ x x x @ @ @ @ @ . . . . . . . . .
//   . . . . . . @ x x x @ . . . . . . . . . . . . .
//   . . . . . . @ x x x @ . . . . . . . . . . . . .
// `;

// const ape_zombie = Pixelart.parse( ape_zombie_design, {
//   colors: {
//     '@':  '#000000',       // color 1 - black
//     'x':  '#7DA269',
//     'o':  '#5E7253',
//     '^':  '#A1C18F',
//     '~':  '#91B080',
//     '%':  '#FF0000',
//   }} );



//   const demon_design = `
//   ###
// # demon (male) - basic - zero attributes
// #
// #  colors:
// #   0 - transparent
// #   1 - black
// #
// #  size: 24x24

// . . . . . . . . . . . . . . . . . . . . . . . .
// . . . . . . . . . . . . . . . . . . . . . . . .
// . . . . . . . . . . . . . . . . . . . . . . . .
// . . . . . . . @ @ . . . . . @ @ . . . . . . . .
// . . . . . . . @ ^ @ . . . @ ^ @ . . . . . . . .
// . . . . . . . @ ^ @ @ @ @ @ ^ @ . . . . . . . .
// . . . . . . . @ ^ ^ ^ ^ ^ ^ ^ @ . . . . . . . .
// . . . . . . @ ^ ^ ^ ^ ^ ^ ^ ^ ^ @ . . . . . . .
// . . . . . . @ ^ ^ ^ ^ ^ ^ ^ ^ ^ @ . . . . . . .
// . . . . . . @ ^ ^ ^ ^ ^ ^ ^ ^ ^ @ . . . . . . .
// . . . . . . @ ^ ^ ^ ^ ^ ^ ^ ^ ^ @ . . . . . . .
// . . . . . . @ ^ ^ x x ^ ^ ^ x x @ . . . . . . .
// . . . . . @ ^ ^ ^ @ o ^ ^ ^ @ o @ . . . . . . .
// . . . . . @ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ @ . . . . . . .
// . . . . . @ @ ^ ^ ^ ^ ^ ^ ^ ^ ^ @ . . . . . . .
// . . . . . . @ ^ ^ ^ ^ ^ @ @ ^ ^ @ . . . . . . .
// . . . . . . @ ^ ^ ^ ^ ^ ^ ^ ^ ^ @ . . . . . . .
// . . . . . . @ ^ ^ ^ ^ ^ ^ ^ ^ ^ @ . . . . . . .
// . . . . . . @ ^ ^ ^ ^ @ @ @ ^ ^ @ . . . . . . .
// . . . . . . @ ^ ^ ^ ^ ^ ^ ^ ^ ^ @ . . . . . . .
// . . . . . . @ ^ ^ ^ ^ ^ ^ ^ ^ @ . . . . . . . .
// . . . . . . @ ^ ^ ^ @ @ @ @ @ . . . . . . . . .
// . . . . . . @ ^ ^ ^ @ . . . . . . . . . . . . .
// . . . . . . @ ^ ^ ^ @ . . . . . . . . . . . . .
// `;

//  const demon = Pixelart.parse( demon_design, {
//                                 colors: {
//                                   '@':  '#000000',       // color 1 - black
//                                   'x':  '#390102',       // color 2 - base 3  (darkest)
//                                   'o':  '#630006',       // color 3 - base 2  (darker)
//                                   '^':  '#850008',       // color 4 - base 1
//                                 }} );



// const human_design = `
// ###
// # human (male) - basic - zero attributes
// #
// #  colors:
// #   0 - transparent
// #   1 - black
// #
// #  size: 24x24

// . . . . . . . . . . . . . . . . . . . . . . . .
// . . . . . . . . . . . . . . . . . . . . . . . .
// . . . . . . . . . . . . . . . . . . . . . . . .
// . . . . . . . . . . . . . . . . . . . . . . . .
// . . . . . . . . . . . . . . . . . . . . . . . .
// . . . . . . . . @ @ @ @ @ @ @ . . . . . . . . .
// . . . . . . . @ ^ ^ ^ ^ ^ ^ ^ @ . . . . . . . .
// . . . . . . @ ^ ^ ~ ^ ^ ^ ^ ^ ^ @ . . . . . . .
// . . . . . . @ ^ ~ ^ ^ ^ ^ ^ ^ ^ @ . . . . . . .
// . . . . . . @ ^ ^ ^ ^ ^ ^ ^ ^ ^ @ . . . . . . .
// . . . . . . @ ^ ^ ^ ^ ^ ^ ^ ^ ^ @ . . . . . . .
// . . . . . . @ ^ ^ x x ^ ^ ^ x x @ . . . . . . .
// . . . . . @ ^ ^ ^ @ o ^ ^ ^ @ o @ . . . . . . .
// . . . . . @ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ @ . . . . . . .
// . . . . . @ @ ^ ^ ^ ^ ^ ^ ^ ^ ^ @ . . . . . . .
// . . . . . . @ ^ ^ ^ ^ ^ @ @ ^ ^ @ . . . . . . .
// . . . . . . @ ^ ^ ^ ^ ^ ^ ^ ^ ^ @ . . . . . . .
// . . . . . . @ ^ ^ ^ ^ ^ ^ ^ ^ ^ @ . . . . . . .
// . . . . . . @ ^ ^ ^ ^ @ @ @ ^ ^ @ . . . . . . .
// . . . . . . @ ^ ^ ^ ^ ^ ^ ^ ^ ^ @ . . . . . . .
// . . . . . . @ ^ ^ ^ ^ ^ ^ ^ ^ @ . . . . . . . .
// . . . . . . @ ^ ^ ^ @ @ @ @ @ . . . . . . . . .
// . . . . . . @ ^ ^ ^ @ . . . . . . . . . . . . .
// . . . . . . @ ^ ^ ^ @ . . . . . . . . . . . . .
// `;



// HUMAN_LIGHT_BASE1   = '#dbb180'   // rgb(219 177 128) - hsl( 32°  56%  68%)
// HUMAN_LIGHT_BASE2   = '#d29d60'   // rgb(210 157  96) - hsl( 32°  56%  60%) - eyes
// HUMAN_LIGHT_BASE3   = '#a66e2c'   // rgb(166 110  44) - hsl( 32°  58%  41%) - eyes
// HUMAN_LIGHT_BASE4   = '#e7cba9'   // rgb(231 203 169) - hsl( 33°  56%  78%)
// HUMAN_LIGHT_BASE5   = '#711010'   // rgb(113  16  16) - hsl(  0°  75%  25%) - mouth

// HUMAN_DARKER_BASE1  = '#713f1d'   // rgb(113  63  29) - hsl( 24°  59%  28%)
// HUMAN_DARKER_BASE2  = '#723709'   // rgb(114  55   9) - hsl( 26°  85%  24%) - eyes
// HUMAN_DARKER_BASE3  = '#562600'   // rgb( 86  38   0) - hsl( 27° 100%  17%) - eyes
// HUMAN_DARKER_BASE4  = '#8b532c'   // rgb(139  83  44) - hsl( 25°  52%  36%)
// HUMAN_DARKER_BASE5  = '#4a1201'   // rgb( 74  18   1) - hsl( 14°  97%  15%) - mouth





// const human_light = Pixelart.parse( human_design, {
//   colors: {
//     '@':  '#000000',       // color 1 - black
//     'x':  HUMAN_LIGHT_BASE3,
//     'o':  HUMAN_LIGHT_BASE2,
//     '^':  HUMAN_LIGHT_BASE1,
//     '~':  HUMAN_LIGHT_BASE4,
//   }} );


// const human_darker = Pixelart.parse( human_design, {
//   colors: {
//     '@':  '#000000',       // color 1 - black
//     'x':  HUMAN_DARKER_BASE3,
//     'o':  HUMAN_DARKER_BASE2,
//     '^':  HUMAN_DARKER_BASE1,
//     '~':  HUMAN_DARKER_BASE4,
//   }} );




// ////////////////////////////////////
// // some add-ons / attributes

// const cap = Pixelart.parse( `
//   . . @ @ @ @ @ @ @ . . . . .
//   . @ @ @ @ @ @ x @ @ . . . .
//   @ @ @ @ @ @ @ @ x @ . . . .
//   @ @ @ @ @ @ @ @ @ @ @ @ @ .
//   @ @ @ @ @ @ @ @ @ @ @ @ @ @`, {
//     colors: {
//       '@': '#8119b7',
//      ' x': '#b261dc' },
//     offset: [6,4]
//    });


// const knittedcap = Pixelart.parse( `
//   . . . @ @ @ @ @ @ @ . . .
//   . . @ o o o o o o o @ . .
//   . @ o o o o o o o o o @ .
//   @ x x x x x x x x x x x @
//   @ x o x o x o x o x o x @`, {
//     colors: {
//       '@': '#000000',
//       'x': '#933709',
//       'o': '#CA4E11' },
//      offset: [5,5],
//   });



// const headband = Pixelart.parse( `
//     x x x x x x x x x
//     @ @ @ @ @ @ @ @ @`, {
//      colors: {
//       '@': '#1A6ED5',
//       'x': '#FFFFFF'
//      },
//      offset: [7,7]
//     });


// const lasereyes_design = `
//   . . . . @ . . . . . @ . . . .
//   . . . . @ . . . . . @ . . . .
//   . . . @ x @ . . . @ x @ . . .
//   @ x x x o x @ . @ x o x x x @
//   . . . @ x @ . . . @ x @ . . .
//   . . . . @ . . . . . @ . . . .
//   . . . . @ . . . . . @ . . . .
//   `;

// const lasereyes = Pixelart.parse( lasereyes_design, {
//     colors: {    // red-ish
//       '@': '#FB1A06',
//       'x': '#F85C0F',
//       'o': '#FFDB3C',
//      },
//      offset: [5,8]
//     });

// const lasereyes_light = Pixelart.parse( lasereyes_design, {
//     colors: {  // yellow-ish
//       '@': '#E6D300',
//       'x': '#FFF799',
//       'o': '#FFFFFF',
//      },
//      offset: [5,8]
//     });
    
// const face_designs = [human_light, human_darker, alien, ape_alien, zombie, ape_zombie, demon];
// const hair_designs = [cap, knittedcap, headband];
// const eyes_designs = [lasereyes, lasereyes_light];

// function pickItem(ary, idx) {
//   if (idx >= ary.length || idx < 0) {
//     return ary[0];
//   }

//   return ary[idx];
// }

// function generatePunkDesign(dna) {
//   const seq = dna.split(";");
//   const face_idx = seq[0];
//   const hair_idx = seq[1];
//   const eyes_idx = seq[2];
  
//   let design = [];
//   let face = pickItem(face_designs, face_idx);
//   design.push(face);

//   if (hair_idx != -1) { // make it a 80 percentage change
//     let hair = (face == demon) ?  headband : pickItem(hair_designs, hair_idx);
//     design.push(hair);
//   }

//   if(eyes_idx != -1) {  // make it a 25 percentage change
//     let eyes = pickItem(eyes_designs, eyes_idx);
//     design.push(eyes);
//   }

//   return design;
// }

// function drawAPunk() {
//   const design = generatePunkDesign("0;1;-1");
//   console.log(design);
//   drawPunk('#punkx20', design, 20);
// }

