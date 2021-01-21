The first rule is, **do not** fork this repo, clone it or use it as template.

The second rule is, **do not** fork this repo, clone it or use it as template.

Good luck! 🔥

# Weglot JS Assessment

## Technical skills (~1h)

Vous devez souvent organiser des réunions de 60 minutes avec vos collègues,
seulement tout le monde a un emploi du temps très chargé. Google agenda vous
donne les indisponibilités de tout le monde, pourquoi ne pas faire en sorte de
trouver ça automatiquement ?

### Format des données

Vous trouverez les données dans le dossier data.

**Entrée**

Chaque ligne est une plage horaire indisponible, au format `d hh:mm-hh:mm`.

`d` est le numéro du jour de la semaine (1 à 5, lundi au vendredi).

`hh:mm-hh:mm` est la plage horaire de ce jour, début et fin incluses.

Les horaires de travail sont du lundi au vendredi de 08:00 à 17:59. Tous les
créneaux indisponibles y sont inclus.

**Sortie**

Une ligne au format `d hh:mm-hh:mm` correspondant à l'horaire de réunion trouvé.
Il doit être:

- en intersection avec aucun créneau d'indisponibilité d'un collègue
- pendant les horaires de travail, sans dépasser
- d'une durée exacte de 60 minutes, début et fin incluses (eg. 14:00-14:59)
- la première solution possible s'il en existe plusieurs

**Exemple**

Pour l'entrée :

```
1 08:45-12:59
3 11:09-11:28
5 09:26-09:56
5 16:15-16:34
3 08:40-10:12
```

La solution est

```
1 13:00-13:59
```

Le premier jour il n'y a qu'un seul créneau indisponible de 08:45 à 12:59. En
faisant par exemple commencer la réunion à 13:00 et en la terminant à 13:59, elle
n'aura aucune intersection avec les créneaux indisponibles.

### Environnement

Vous travaillez avec Node.js v12.18.4

### Tests

Créez un test avec une librairie adéquate en prenant les _inputX.txt_ en entrée
pour vérifier que le résultat de votre fonction correspond aux sorties attendues
dans les _outputX.txt_ dans le dossier data.

### Déploiement

Envoyez votre solution sur un repo git accessible sur Github ou Gitlab puis
envoyez nous le lien de ce repo, avec l'accès si nécessaire.

### Bonus

1. Vous préférez avoir un code standardisé ? Nous aussi. Ajoutez votre
   config préférée.

2. Créez une config CI pour exécuter la commande test sur votre repo à chaque
   modification.

---

## Code review (~20m)

Passez en revue le code ci dessous

Si vous pensez que des modifications sont utiles
1. écrivez un commentaire comme pendant une review de pull request
2. puis écrivez le code comme vous l'imagineriez

**NB**

- Faites ces reviews comme bon vous semble, tout n'est pas à commenter
- Ne commentez pas le style (indentation, trailing comma, etc.)
- Admettez que le code fonctionne
- Ces bouts de codes fictifs n'ont rien à voir les uns avec les autres
- Ne vous attardez pas sur des détails, comme le naming, qui ne nous intéressent pas ici

1.

```js
const data = [
  { value: "1", label: "One" },
  { value: "2", label: "Two" },
  { value: "3", label: "Three" },
];

const values = data.reduce((values, { value }) => { // using a map function would be simpler
  values.push(value);
  return values;
}, []);
```
Suggestion:
```js
const values = data.map(element => element.value);
```

2.

```js
async function getIndexes() {
   return await fetch('https://api.coingecko.com/api/v3/indexes').then(res => res.json());

async function analyzeIndexes() {
   const indexes = await getIndexes().catch(_ => { // I find it more readable tu use try-catch wih async-await
      throw new Error('Unable to fetch indexes');
   });
   return indexes;
}
```
Suggestion
```js
async function analyzeIndexes() {
   try {
      return await getIndexes()
   }
   catch(_) {
      throw new Error('Unable to fetch indexes');
   }
}
```

3.

```js
let state; // since state isn't redefined, you can afford to use a const here and remove the else condition
const user = getUser();
if (user) {
   const project = getProject(user.id);
   state = {
      user,
      project
   };
} else {
   state = {
      user: null,
      project: null
   };
}
ctx.body = state;
```
Suggestion
```js
const state = {
      user: null,
      project: null
   };
const user = getUser();
if (user) {
   const project = getProject(user.id);
   state = {
      user,
      project
   };
}
ctx.body = state
```


4.

```js
function getQueryProvider() {
  const url = window.location.href;
  const [_, provider] = url.match(/provider=([^&]*)/); // is the regexp match returns null, it is not decomposable. However if it is an array, you can return its second element anyway, weather defined or not, you'd still have the same function
  if (provider) {
     return provider;
  }
  return;
}
```
Suggestion
```js
function getQueryProvider() {
  const url = window.location.href;
  const matchingProviders = url.match(/provider=([^&]*)/);
  if (matchingProviders) {
     return matchingProviders[1];
  }
}
```

5.

```js
function getParagraphTexts() {
   const texts = [];
   document.querySelectorAll("p").forEach(p => { // If it is legit to quote some sources found on the net, I've found the following link this on the topic, so basically in a IE free environment, you can use Array.from() (https://gomakethings.com/converting-a-nodelist-to-an-array-with-vanilla-javascript/)
      texts.push(p);
   });
   return texts;
}
```
Suggestion
```js
function getParagraphTexts() {
   return Array.from(document.querySelectorAll("p"))
}
```

6.

```js
function Employee({ id }) {
   const [error, setError] = useState(null);
   const [loading, setLoading] = useState(true);
   const [employee, setEmployee] = useState({});

   useEffect(() => { // I don't know how this state system is supposed to work, but it seems like it could deserve some asynchronous support.
      getEmployee(id)
         .then(employee => {
            setEmployee(employee);
            setLoading(false);
         })
         .catch(_ => {
            setError('Unable to fetch employee');
            setLoading(false);
         });
   }, [id]);

   if (error) {
      return <Error />;
   }

   if (loading) {
      return <Loading />;
   }

   return ( // It could be done using a loop of some sort, and some verification on undefined values (cf suggestion if it suits yor taste).
      <Table>
         <Row>
            <Cell>{employee.firstName}</Cell>
            <Cell>{employee.lastName}</Cell>
            <Cell>{employee.position}</Cell>
            <Cell>{employee.project}</Cell>
            <Cell>{employee.salary}</Cell>
            <Cell>{employee.yearHired}</Cell>
            <Cell>{employee.wololo}</Cell>
         </Row>
      </Table>
   );
}
```
Suggestion
```js
const displayableEmployeeProperties=["firstName", "lastName", "position", "project", "salary", "yearHired", "wololo"]
return `
   <Table>
      <Row>
         ${displayableEmployeeProperties.reduce((acc, property) => {
            if (employe.hasOwnProperty(property)){
               acc.concat(`<Cell>${employee[property]}</Cell>\n`)
            }
            return acc
         },"")}
      </Row>
   </Table>
   `
```

7.

```js
async function getFilledIndexes() {
   try {
      const filledIndexes = [];
      const indexes = await getIndexes();
      const status = await getStatus();
      const usersId = await getUsersId();

      for (let index of indexes) { // assumig indexes is an array, you can use a filter
         if (index.status === status.filled && usersId.includes(index.userId)) {
            filledIndexes.push(index);
         }
      }
      return filledIndexes;
   } catch(_) {
      throw new Error ('Unable to get indexes');
   }
}
```
Suggestion
```js
const filledIndexes = indexdes.filter(index =>  (index.status === status.filled && usersId.includes(index.userId)) )
```

8.

```js
function getUserSettings(user) {
   if (user) {
      const project = getProject(user.id);
      if (project) {
         const settings = getSettings(project.id); // it's a bit heavy but without further context, a bit hard to improve, multiple condition could call for return first or ternaries but right here it would only make the expression more heavy... so I'm a bit dry on this one
         if (settings) {
            return settings;
         }
      }
   }
   return {};
}
```