import React from 'react'
import { IonApp } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import { Route, Switch } from 'react-router-dom'
import Home from './pages/Home.jsx'
import AddEditRecipe from './pages/AddEditRecipe.jsx'
import RecipeDetail from './pages/RecipeDetail.jsx'

export default function App() {
  return (
    <IonApp>
      <IonReactRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/add" component={AddEditRecipe} />
          <Route exact path="/edit/:id" component={AddEditRecipe} />
          <Route exact path="/recipe/:id" component={RecipeDetail} />
        </Switch>
      </IonReactRouter>
    </IonApp>
  )
}