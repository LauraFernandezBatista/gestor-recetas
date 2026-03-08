import React, { useMemo, useState } from 'react'
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonButton,
  IonList,
  IonItem,
  IonLabel,
  IonSearchbar,
  IonAlert
} from '@ionic/react'
import { useHistory } from 'react-router-dom'
import * as recipes from '../services/recipeService.js'

export default function Home() {
  const history = useHistory()
  const [search, setSearch] = useState('')
  const [confirmDelete, setConfirmDelete] = useState(null)

  const data = useMemo(() => {
    const all = recipes.getAll()
    if (!search) return all
    return all.filter(r =>
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      (r.ingredients || []).some(i => i.toLowerCase().includes(search.toLowerCase())) ||
      (r.tags || []).some(t => t.toLowerCase().includes(search.toLowerCase()))
    )
  }, [search])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Recetas</IonTitle>
          <IonButtons slot="end">
            <IonButton data-cy="add-btn" onClick={() => history.push('/add')}>Añadir</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonSearchbar
          data-cy="search"
          placeholder="Buscar por título, tag o ingrediente"
          value={search}
          onIonInput={e => setSearch(e.detail.value)}
        />
        <IonList>
          {data.length === 0 && <p>No hay recetas. Pulsa “Añadir” para crear la primera.</p>}
          {data.map(r => (
            <IonItem key={r.id} button onClick={() => history.push('/recipe/' + r.id)}>
              <IonLabel>{r.title}</IonLabel>
              <IonButtons slot="end">
                <IonButton onClick={e => { e.stopPropagation(); history.push('/edit/' + r.id) }}>Editar</IonButton>
                <IonButton color="danger" onClick={e => { e.stopPropagation(); setConfirmDelete(r) }}>Eliminar</IonButton>
              </IonButtons>
            </IonItem>
          ))}
        </IonList>
        <IonAlert
          isOpen={!!confirmDelete}
          onDidDismiss={() => setConfirmDelete(null)}
          header="Eliminar receta"
          message="¿Seguro que quieres eliminarla? Esta acción no se puede deshacer."
          buttons={[
            { text: 'Cancelar', role: 'cancel' },
            { text: 'Eliminar', role: 'destructive', handler: () => { recipes.remove(confirmDelete.id); setConfirmDelete(null) } }
          ]}
        />
      </IonContent>
    </IonPage>
  )
}