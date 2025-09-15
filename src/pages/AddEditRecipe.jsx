import React, { useMemo } from 'react'
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/react'
import { useHistory, useParams } from 'react-router-dom'
import RecipeForm from '../components/RecipeForm.jsx'
import * as store from '../services/recipeService.js'

export default function AddEditRecipe() {
  const history = useHistory()
  const { id } = useParams()
  const recipe = useMemo(() => (id ? store.getById(id) : null), [id])

  const handleSubmit = (data) => {
    if (id) {
      store.update({ ...data, id })
    } else {
      store.add(data)
    }
    history.push('/')
  }

  const handleCancel = () => {
    history.push('/')
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{id ? 'Editar receta' : 'Añadir receta'}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <RecipeForm initial={recipe} onSubmit={handleSubmit} onCancel={handleCancel} />
      </IonContent>
    </IonPage>
  )
}