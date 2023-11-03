export const PersisterConfigs = {
    characterPrefix: 'character_',
    lastUpdatedKey: 'lastUpdated',
    defaultCharacterName: 'Nouveau personnage',
    defaultNameIfEmpty: (name: string) => name?.trim() || 'Nouveau personnage',
};