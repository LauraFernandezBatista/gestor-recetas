import React, { useEffect, useState } from "react";
import {
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonList,
  IonButtons,
  IonButton,
  IonText,
} from "@ionic/react";

export default function RecipeForm({ initial = null, onSubmit, onCancel }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [tags, setTags] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (initial) {
      setTitle(initial.title || "");
      setDescription(initial.description || "");
      setIngredients((initial.ingredients || []).join("\n"));
      setTags((initial.tags || []).join(", "));
    }
  }, [initial]);

  const handleSubmit = () => {
    if (!title.trim()) {
      setError("El título es obligatorio");
      return;
    }
    setError("");
    onSubmit({
      ...initial,
      title,
      description,
      ingredients: ingredients
        .split("\n")
        .map((i) => i.trim())
        .filter(Boolean),
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    });
  };

  return (
    <IonList>
      <IonItem data-cy="title">
        <IonLabel position="stacked">Título</IonLabel>
        <IonInput
          value={title}
          onIonInput={(e) => setTitle(e.target.value)}
          placeholder="Ej: Pisto manchego"
        />
      </IonItem>

      <IonItem data-cy="description">
        <IonLabel position="stacked">Descripción</IonLabel>
        <IonTextarea
          value={description}
          onIonInput={(e) => setDescription(e.target.value)}
        />
      </IonItem>

      <IonItem data-cy="ingredients">
        <IonLabel position="stacked">Ingredientes</IonLabel>
        <IonTextarea
          value={ingredients}
          onIonInput={(e) => setIngredients(e.target.value)}
          placeholder="Separados por salto de línea"
        />
      </IonItem>

      <IonItem data-cy="tags">
        <IonLabel position="stacked">Tags</IonLabel>
        <IonInput
          value={tags}
          onIonInput={(e) => setTags(e.target.value)}
          placeholder="Separados por coma"
        />
      </IonItem>

      {error && (
        <IonText color="danger">
          <p>{error}</p>
        </IonText>
      )}

      <IonButtons>
        <IonButton data-cy="save" onClick={handleSubmit}>
          Guardar
        </IonButton>
        <IonButton onClick={onCancel} color="medium">
          Cancelar
        </IonButton>
      </IonButtons>
    </IonList>
  );
}
