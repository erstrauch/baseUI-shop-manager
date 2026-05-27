import { Accordion } from '@base-ui/react';
import styles from './item.module.css';
import { useState } from 'react';

// TODO:
//  Update commented types (below)
//  Look at the buildItems function
//  Clean up the return statement

// type Subitem = {
// 	UID: string;
// 	Price: number;
// 	Count: number;
// 	origin: string;
// };

// type Item = {
// 	name: string;
// 	subitems: Subitem[];
// 	totalPrice: number;
// 	totalCount: number;
// 	pricePerItem: number;
// };

type Subitem = {
  UID: string;
  price: number;
  count: number;
  origin: string;
};

type Item = {
  name: string;
  subitems: Subitem[];
};

const data: Item[] = [
  {
    name: 'Item A',
    subitems: [
      { UID: 'a1', price: 10, count: 2, origin: 'michaels' },
      { UID: 'a2', price: 15, count: 1, origin: 'michaels' },
    ],
  },
  {
    name: 'Item B',
    subitems: [
      { UID: 'b1', price: 7, count: 4, origin: 'michaels' },
      { UID: 'b2', price: 12, count: 3, origin: 'amazon' },
    ],
  },
];

function Item() {
  const [globalData, setGlobalData] = useState<string[][]>([]);

  const handleCSVUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const text = await file.text();
    if (!text) return;

    const CSVrows = text.trim().split(/\r?\n/);
    const CSVData = CSVrows.map((CSVRow) => CSVRow.split(','));

    if (CSVData.length !== 0) {
      setGlobalData(CSVData);
    } else {
      return;
    }

    const [headers, ...rows] = CSVData;

    const JSONData = rows?.map((row) => {
      return row.reduce(
        (obj: Record<string, string>, cell: string, index: number) => {
          const key = headers?.[index];
          if (key) {
            obj[key] = cell;
          }
          return obj;
        },
        {} as Record<string, string>,
      );
    });

    buildItems(JSONData);
  };

  function buildItems(data: any): Item[] {
    const map = new Map<string, Item>();

    for (const entry of data) {
      const existingItem = map.get(entry.name);

      // Create new item
      if (!existingItem) {
        map.set(entry.name, {
          name: entry.name,
          subitems: [
            {
              UID: entry.UID,
              price: entry.Price,
              count: entry.Count,
              origin: entry.origin,
            },
          ],
          //commented out temporarily
          // totalPrice: entry.Price,
          // totalCount: entry.Count,
          // pricePerItem: entry.Count === 0 ? 0 : entry.Price / entry.Count,
        });

        continue;
      }

      // Skip duplicate UID
      const subitemExists = existingItem.subitems.some((subitem) => subitem.UID === entry.UID);

      if (subitemExists) {
        continue;
      }

      // Add new subitem
      existingItem.subitems.push({
        UID: entry.UID,
        price: entry.Price,
        count: entry.Count,
        origin: entry.origin,
      });

      // Commented out temporarily
      // existingItem.totalPrice += entry.Price;
      // existingItem.totalCount += entry.Count;

      // existingItem.pricePerItem =
      //   existingItem.totalCount === 0 ? 0 : existingItem.totalPrice / existingItem.totalCount;
    }

    return Array.from(map.values());
  }

  console.log('testing globalData', globalData);

  return (
    <>
      <input type="file" accept=".csv" onChange={handleCSVUpload} />

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Total Price</th>
            <th>Total Count</th>
            <th>Price per Item</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => {
            const totalPrice = item.subitems.reduce((sum, subitem) => sum + subitem.price, 0);

            const totalCount = item.subitems.reduce((sum, subitem) => sum + subitem.count, 0);

            const pricePerItem = totalCount > 0 ? (totalPrice / totalCount).toFixed(2) : '0.00';

            return (
              <tr key={item.name}>
                <td colSpan={4} style={{ padding: 0 }}>
                  <Accordion.Root>
                    <Accordion.Item>
                      <Accordion.Header className={styles.header}>
                        <Accordion.Trigger className={styles.trigger}>
                          <span>{item.name}</span>
                          <span>{totalPrice}</span>
                          <span>{totalCount}</span>
                          <span>{pricePerItem}</span>
                        </Accordion.Trigger>
                      </Accordion.Header>

                      <Accordion.Panel>
                        <table border={1} cellPadding={8} cellSpacing={0} width="100%">
                          <thead>
                            <tr>
                              <th>UID</th>
                              <th>Price</th>
                              <th>Count</th>
                              <th>Origin</th>
                            </tr>
                          </thead>
                          <tbody>
                            {item.subitems.map((subitem) => (
                              // TODO: update key to something actually unique later
                              <tr key={subitem.UID}>
                                <td>{subitem.UID}</td>
                                <td>{subitem.price}</td>
                                <td>{subitem.count}</td>
                                <td>{subitem.origin}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </Accordion.Panel>
                    </Accordion.Item>
                  </Accordion.Root>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default Item;
