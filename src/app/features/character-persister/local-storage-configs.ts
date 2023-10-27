export const LocalStorageConfigs = {
    characterPrefix: 'character_',
    defaultCharacterName: 'Nouveau personnage',
    defaultNameIfEmpty: (name: string) => name?.trim() || 'Nouveau personnage',
};