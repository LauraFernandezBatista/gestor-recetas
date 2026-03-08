import React, { useEffect, useState } from "react"
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonButtons,
  IonBackButton,
} from "@ionic/react"
import { useParams, useHistory } from "react-router-dom"
import * as store from "../services/recipeService"

export default function RecipeDetail() {
  const { id } = useParams()
  const history = useHistory()
  const [recipe, setRecipe] = useState(null)

  useEffect(() => {
    const r = store.getById(id)
    if (!r) {
      history.push("/")
    } else {
      setRecipe(r)
    }
  }, [id, history])

  if (!recipe) return null

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            {/* 🔧 Aquí el fix: añadimos data-cy */}
            <IonBackButton defaultHref="/" data-cy="back-btn" />
          </IonButtons>
          <IonTitle>{recipe.title}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <IonItem>
            <IonLabel>
              <h2>Descripción</h2>
              <p>{recipe.description}</p>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>
              <h2>Ingredientes</h2>
              <ul>
                {recipe.ingredients.map((ing, i) => (
                  <li key={i}>{ing}</li>
                ))}
              </ul>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>
              <h2>Tags</h2>
              <p>{recipe.tags}</p>
            </IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  )
}
