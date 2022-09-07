import EditIcon from '../assets/Icons/EditIcon';
import TrashIcon from '../assets/Icons/TrashIcon';
import Button from './Button';

const TableComponent = (props) => {
  const { fields, fieldsToShow, data, actions, actionEdit, actionDelete } =
    props;

  return (
    <div className="h-55vh drop-shadow-2xl border-b border-gray-200 overflow-x-visible sm:overflow-x-hidden overflow-y-scroll rounded-lg">
      <table className="w-full divide-gray-200">
        <thead className="bg-gray-300">
          <tr className="text-base">
            {fields.map((field, index) => (
              <th scope="col" className="p-2 uppercase" key={index}>
                {field}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-gray-200">
          {data.map((dataItem, indexD) => {
            return (
              <tr key={indexD} className="text-base">
                {fieldsToShow.map((toShow, indexF) => (
                  <th key={indexF} scope="row" className="p-2 text-base">
                    {dataItem[toShow]}
                  </th>
                ))}
                {actions && (
                  <>
                    <th scope="row" className="p-2 text-base">
                      <Button
                        label={<EditIcon />}
                        classes="py-2"
                        handleClick={actionEdit}
                      />
                    </th>
                    <th scope="row" className="py-2 pl-6 pr-2 text-base">
                      <Button
                        // label={'Eliminar'}
                        label={<TrashIcon />}
                        classes="py-2 hover:bg-red-500"
                        handleClick={actionDelete}
                      />
                    </th>
                  </>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
