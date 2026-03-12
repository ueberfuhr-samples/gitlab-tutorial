import {Difficulty, PortionUnits, Recipe, TimeUnit} from "../models/recipe.model";

export const recipes: Recipe[] = [
  {
    name: 'Pizza',
    img: '/recipe_pictures/pizza.jpg',
    servings: 4,
    lastEdited: "2.7.2024, 09:26:00",
    duration: {
      unit: TimeUnit.MINUTES,
      value: 30
    },
    difficulty: Difficulty.MEDIUM,
    ingredients: [
      {
        unit: PortionUnits.GRAM,
        quantity: 200,
        name: 'Weizenmehl Type 550',
      },
      {
        unit: PortionUnits.GRAM,
        quantity: 50,
        name: 'Hartweizengrieß',
      },
      {
        unit: PortionUnits.CUBE,
        quantity: 0.25,
        name: 'Hefe',
      },
      {
        unit: PortionUnits.MILILITER,
        quantity: 160,
        name: 'Wasser, lauwarm',
      },
      {
        unit: PortionUnits.TEASPOON,
        quantity: 1,
        name: 'Salz',
      },
      {
        unit: PortionUnits.TABLESPOON,
        quantity: 2,
        name: 'Olivenöl',
      },
      {
        unit: PortionUnits.NONE,
        quantity: 4,
        name: 'Romatomaten',
      },
      {
        unit: PortionUnits.TEASPOON,
        quantity: 1,
        name: 'Oregano, getrocknet',
      },
      {
        unit: PortionUnits.TEASPOON,
        quantity: 0.25,
        name: 'Salz',
      },
      {
        unit: PortionUnits.BALL,
        quantity: 1,
        name: 'Büffelmozzarella',
      },
    ],
    preparation: `
            Zunächst für den Pizzateig Mehl, Grieß und Salz gründlich vermengen. Die Hefe im warmen Wasser auflösen, 5 Minuten ruhen lassen und dann zur Mehlmischung geben. Die Zutaten so lange mit dem Knethaken des Handrührers, in der Küchenmaschine oder von Hand kneten, bis ein elastischer Teig entsteht, das dauert ungefähr 10 Minuten. Falls der Teig zu fest sein sollte einfach noch etwas warmes Wasser zugeben, wenn der Teig zu flüssig ist, etwas Mehl hinzugeben. Erst dann das Olivenöl unterkneten.\n
            Den Teig in Frischhaltefolie wickeln oder unter einem Geschirrtuch mindestens 30 Minuten gehen lassen. Der Teig lässt sich ebenfalls hervorragend im Hefeteig-Programm eines Brotbackautomaten zubereiten.\n
            In der Zwischenzeit die Roma-Tomaten quer halbieren und über einer feinen Reibe bis auf die Schale abreiben. Das überschüssige Wasser aus den Tomaten durch ein feines Sieb abgießen, so dass nur der Tomatensaft und das Innere der Tomaten übrig bleiben. Diese Tomaten nach Geschmack mit etwas Salz würzen.\n
            Ein Backblech ordentlich mit gutem, erhitzbarem Olivenöl bepinseln und den Ofen auf 250°C Ober- und Unterhitze vorheizen. Den Teig nochmals von Hand durchkneten und auf einem bemehlten Brett etwa in Größe des Blechs von der Mitte nach außen ausrollen. Der Teig sollte dabei etwa 3 mm dick ausgerollt werden.\n
            Den ausgerollten Teig auf das Blech geben und nur hauchdünn (das ist wichtig!) mit den Tomaten bestreichen. Mit dem Oregano bestreuen. Die Chorizo in feine Stücke schneiden und auf der Pizza verteilen. Den Mozzarella von Hand in Stücke reißen und über die Pizza streuen.\n
            Auf der zweiten Einschubleiste von unten etwa 10 Minuten backen. Wer einen Pizzastein hat, kann sich das Backen auf dem Blech natürlich sparen und stattdessen zwei Runde Pizzen aus dem Teig formen.
        `,
  },
  {
    name: 'Pfannkuchen',
    img: '/recipe_pictures/pfannkuchen.jpg',
    servings: 4,
    lastEdited: "2.7.2024, 09:26:00",
    duration: {
      unit: TimeUnit.MINUTES,
      value: 10
    },
    difficulty: Difficulty.EASY,
    ingredients: [
      {
        unit: PortionUnits.NONE,
        quantity: 3,
        name: 'Eier',
      },
      {
        unit: PortionUnits.MILILITER,
        quantity: 750,
        name: 'Milch',
      },
      {
        unit: PortionUnits.GRAM,
        quantity: 400,
        name: 'Mehl',
      },
      {
        unit: PortionUnits.PINCH,
        quantity: 1,
        name: 'Salz',
      },
      {
        unit: PortionUnits.TABLESPOON,
        quantity: 4,
        name: 'Fett für die Pfanne',
      },
    ],
    preparation: `
            Aus den Zutaten einen glatten Teig rühren, am besten mit der Küchenmaschine oder dem Handmixer. Dann den Teig rund 15 - 30 Minuten zugedeckt im Kühlschrank ruhen lassen.\n
            Während das Fett in der Pfanne erhitzt wird, den Teig nochmal kurz durchrühren. Schöpflöffelweise den Pfannkuchenteig in die heiße Pfanne gießen. Die Unterseite stocken und goldbraun backen, dann vorsichtig wenden. Die zweite Seite ebenfalls goldbraun backen.\n
            Die fertigen Pfannkuchen im heißen Backofen (ca. 100 °C Ober und Unterhitze oder 80 °C Umluft) warm stellen, bis der gesamte Teig aufgebraucht ist.\n
            Entweder isst man die Pfannkuchen süß oder man wählt die herzhafte Variante.
        `,
  },
  {
    name: 'Tacos',
    img: '/recipe_pictures/tacos.jpg',
    servings: 4,
    lastEdited: "2.7.2024, 09:26:00",
    duration: {
      unit: TimeUnit.MINUTES,
      value: 20
    },
    difficulty: Difficulty.EASY,
    ingredients: [
      {
        unit: PortionUnits.GRAM,
        quantity: 100,
        name: 'Gorgonzola',
      },
      {
        unit: PortionUnits.GRAM,
        quantity: 100,
        name: 'saure Sahne',
      },
      {
        unit: PortionUnits.TABLESPOON,
        quantity: 6,
        name: 'Orangensaft',
      },
      {
        unit: PortionUnits.NONE,
        quantity: 1,
        name: 'Salz',
      },
      {
        unit: PortionUnits.NONE,
        quantity: 1,
        name: 'Pfeffer',
      },
      {
        unit: PortionUnits.NONE,
        quantity: 1,
        name: 'Kopf Eisbergsalat',
      },
      {
        unit: PortionUnits.NONE,
        quantity: 4,
        name: 'Tomaten',
      },
      {
        unit: PortionUnits.GRAM,
        quantity: 150,
        name: 'Mais',
      },
      {
        unit: PortionUnits.NONE,
        quantity: 4,
        name: 'kleine Zwiebeln',
      },
      {
        unit: PortionUnits.NONE,
        quantity: 1,
        name: 'zehe Knoblauch',
      },
      {
        unit: PortionUnits.TABLESPOON,
        quantity: 4,
        name: 'Olivenöl',
      },
      {
        unit: PortionUnits.GRAM,
        quantity: 400,
        name: 'Hackfleisch vom Rind',
      },
      {
        unit: PortionUnits.GRAM,
        quantity: 10,
        name: 'Chillipulver',
      },
      {
        unit: PortionUnits.TABLESPOON,
        quantity: 4,
        name: 'Tomaten, püriert',
      },
      {
        unit: PortionUnits.GRAM,
        quantity: 20,
        name: 'Creme fraiche',
      },
      {
        unit: PortionUnits.NONE,
        quantity: 8,
        name: 'Tacos (Schalen)',
      },
    ],
    preparation: `
            Den Gorgonzola grob hacken, saure Sahne und Orangensaft dazugeben und mit dem Stabmixer pürieren. Mit Salz und Pfeffer abschmecken.
            Den Eisbergsalat waschen, trocknen, entstielen und fein würfeln. Den Mais abgießen und abtropfen lassen. Die Zwiebeln schälen und fein würfeln, den Knoblauch schälen und durchpressen.
            Das Olivenöl in einer Pfanne erhitzen, Zwiebeln und Knoblauch darin glasig schwitzen. Das Hackfleisch hinzufügen und kräftig durchbraten, mehrfach umrühren. Mit Salz, Pfeffer und Chilipulver würzen. Mais, pürierte Tomaten und die Creme fraiche unterrühren und nochmals abschmecken.
            Die Taco-Schalen nach Packungsanweisung im vorgeheizten Backofen erwärmen. Anschließend mit Salatstreifen und Hackfleischmasse füllen, die Käsecreme darüber geben.
            Mit Tomatenwürfeln bestreut servieren.
        `,
  },
  {
    name: 'Currywurst - Soße',
    img: '/recipe_pictures/currywurst.jpg',
    servings: 2,
    lastEdited: "2.7.2024, 09:26:00",
    duration: {
      unit: TimeUnit.MINUTES,
      value: 5
    },
    difficulty: Difficulty.EASY,
    ingredients: [
      {
        unit: PortionUnits.GRAM,
        quantity: 10,
        name: 'Olivenöl',
      },
      {
        unit: PortionUnits.GRAM,
        quantity: 120,
        name: 'Tomatenketchup',
      },
      {
        unit: PortionUnits.GRAM,
        quantity: 60,
        name: 'Wasser',
      },
      {
        unit: PortionUnits.TABLESPOON,
        quantity: 1,
        name: 'Currypulver',
      },
      {
        unit: PortionUnits.TEASPOON,
        quantity: 0.5,
        name: 'Cayennepfeffer',
      },
      {
        unit: PortionUnits.TEASPOON,
        quantity: 0.5,
        name: 'Brühe, gekörnte',
      },
      {
        unit: PortionUnits.TABLESPOON,
        quantity: 2,
        name: 'Zucker',
      },
      {
        unit: PortionUnits.TEASPOON,
        quantity: 0.5,
        name: 'Salz',
      },
      {
        unit: PortionUnits.PINCH,
        quantity: 1,
        name: 'Pfeffer',
      },
    ],
    preparation: `
            Öl, Tomatenketchup und Wasser in einem Topf vermischen und etwa 1 Min. bei starker Hitze kochen lassen. Die restlichen Zutaten hinzufügen und 3 Min. weiter köcheln lassen. Optional kann noch 1 TL Essig hinzugefügt werden.\n
            Für Leute, die es gerne schärfer mögen, kann man das Tomatenketchup teilweise durch scharfes Curry-/Chiliketchup ersetzen. Geht fix und schmeckt einfach köstlich zu einer Currywurst.
        `,
  },
  {
    name: 'Kohlrouladen',
    img: '/recipe_pictures/kohlrouladen.jpg',
    servings: 4,
    lastEdited: "2.7.2024, 09:26:00",
    duration: {
      unit: TimeUnit.MINUTES,
      value: 50
    },
    difficulty: Difficulty.MEDIUM,
    ingredients: [
      {
        unit: PortionUnits.NONE,
        quantity: 1,
        name: 'Wirsing oder Weißkohl',
      },
      {
        unit: PortionUnits.GRAM,
        quantity: 100,
        name: 'Speckwürfel',
      },
      {
        unit: PortionUnits.MILILITER,
        quantity: 500,
        name: 'Brühe',
      },
      {
        unit: PortionUnits.MILILITER,
        quantity: 200,
        name: 'Sahne',
      },
      {
        unit: PortionUnits.GRAM,
        quantity: 500,
        name: 'Hackfleisch',
      },
      {
        unit: PortionUnits.NONE,
        quantity: 1,
        name: 'Eier',
      },
      {
        unit: PortionUnits.NONE,
        quantity: 1,
        name: 'Brötchen, altbacken',
      },
      {
        unit: PortionUnits.TABLESPOON,
        quantity: 1.5,
        name: 'Senf',
      },
      {
        unit: PortionUnits.NONE,
        quantity: 1,
        name: 'Zwiebel',
      },
      {
        unit: PortionUnits.PINCH,
        quantity: 1,
        name: 'Salz',
      },
      {
        unit: PortionUnits.PINCH,
        quantity: 1,
        name: 'Pfeffer',
      },
      {
        unit: PortionUnits.PINCH,
        quantity: 1,
        name: 'Majoran',
      },
    ],
    preparation: `
            Acht schöne Blätter vom Wirsing oder Weißkohl ablösen und in kochendem Salzwasser blanchieren. In Eiswasser abschrecken und mit einem Küchentuch etwas trocknen.\n
            Für den Hackfleischteig das Brötchen in reichlich kaltem Wasser einweichen. Danach sehr gut ausdrücken. Hackfleisch, das Ei, das ausgedrückte Brötchen, 1 - 2 EL Senf, die fein gewürfelte Zwiebel, ordentlich Salz, Pfeffer und scharfes Paprikapulver in eine Schüssel geben. Zum Schluss nach Belieben noch getrockneten Majoran hineinstreuen. Alles gut vermengen.\n
            Kleine Häufchen vom Hackfleischteig auf die ausgelegten Kohlblätter verteilen, zusammenrollen und mit Küchengarn zusammenbinden.\n
            Die Kohlrouladen in einer hohen Pfanne anbraten, sodass sie Farbe bekommen. Dabei auch die Speckwürfel mit auslassen. Haben die Kohlrouladen etwas Farbe angenommen, mit Brühe aufgießen. Zugedeckt eine halbe Stunde schmoren lassen. Zum Schluss die Rouladen herausnehmen. Sahne zur Soße geben, etwas einkochen lassen oder evtl. leicht abbinden. Mit wenig Salz und Pfeffer abschmecken und die Soße zu den Kohlrouladen servieren.
        `,
  },
  {
    name: 'Spaghetti Bolognese',
    img: '/recipe_pictures/spaghetti.jpg',
    servings: 4,
    lastEdited: "2.7.2024, 09:26:00",
    duration: {
      unit: TimeUnit.MINUTES,
      value: 20
    },
    difficulty: Difficulty.MEDIUM,
    ingredients: [
      {
        unit: PortionUnits.NONE,
        quantity: 1,
        name: 'Zwiebel',
      },
      {
        unit: PortionUnits.NONE,
        quantity: 1,
        name: 'Knoblauch, zehe',
      },
      {
        unit: PortionUnits.NONE,
        quantity: 1,
        name: 'Möhre',
      },
      {
        unit: PortionUnits.GRAM,
        quantity: 500,
        name: 'Rinderhackfleisch oder Tartar',
      },
      {
        unit: PortionUnits.MILILITER,
        quantity: 200,
        name: 'Gemüsebrühe (Instant)',
      },
      {
        unit: PortionUnits.PINCH,
        quantity: 1,
        name: 'Salz',
      },
      {
        unit: PortionUnits.PINCH,
        quantity: 1,
        name: 'Pfeffer',
      },
      {
        unit: PortionUnits.GRAM,
        quantity: 70,
        name: 'Tomatenmark',
      },
      {
        unit: PortionUnits.TEASPOON,
        quantity: 1,
        name: 'Oregano',
      },
      {
        unit: PortionUnits.GRAM,
        quantity: 400,
        name: 'Tomaten, stückige, mit Kräutern',
      },
      {
        unit: PortionUnits.TABLESPOON,
        quantity: 2,
        name: 'Tomatenketchup',
      },
      {
        unit: PortionUnits.GRAM,
        quantity: 500,
        name: 'Spaghetti',
      },
    ],
    preparation: `
            Zwiebel, Knoblauch und Möhre schälen und in feine Würfel schneiden.\n
            Hackfleisch in die Pfanne geben, langsam erhitzen und im eigenen Fett unter Rühren anbraten. Salzen und pfeffern. Zwiebeln, Knoblauch und Möhren dazugeben und kurz mitbraten. Mit der Brühe ablöschen. Dann Tomatenmark, Oregano, die stückigen Tomaten und Tomatenketchup unterrühren. Etwa 40 Minuten einkochen lassen.\n
            Spaghetti in Salzwasser bissfest kochen. Durch ein Sieb abgießen, mit kaltem Wasser abschrecken und zusammen mit der Sauce servieren.\n
            Tipp: Die Sauce Bolognese schmeckt auch lecker zu Reis.
        `,
  },
];
