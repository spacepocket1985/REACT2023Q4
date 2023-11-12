const namesData = ['Rick', 'Bob', 'Timon', 'Pumba', 'Sandy'];
const genderData = ['male, female, unknow'];
const statusData = ['dead', 'alive', 'zombie'];
const createdData = ['today', '12.12.2000', '11.11.2023'];

export const generateCharacters = (quantity: number) => {
  const characters = Array.from({ length: quantity }, (_, index) => {
    const id = index + 1;
    const name = `${namesData[Math.floor(Math.random() * namesData.length)]}-${index}`;
    const gender = genderData[Math.floor(Math.random() * genderData.length)];
    const status = statusData[Math.floor(Math.random() * statusData.length)];
    const created = createdData[Math.floor(Math.random() * createdData.length)];
    const image = `character-image-${id}`;

    return { id, name, gender, status, created, image };
  });

  return characters;
};
