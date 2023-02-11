import { component$, useStylesScoped$ } from '@builder.io/qwik';
import sryles from './css/container-desc-short.css?inline';
import { ContainerDescription } from './crtr-description';
export const ContainerDescriptionShort = component$(({ props }: any) => {
  useStylesScoped$(sryles);
  const renderTbProtein = (key: any, label: any) => {
    if (!props || !props.tbProtein[key]) return null;
    return (
      <>
        {' '}
        <tr>
          {' '}
          <td>{label}</td>
          <td class="td-scs">{props.tbProtein[key]}</td>
        </tr>
      </>
    );
  };
  return (
    <div class="crtr-sbr-art">
      <ContainerDescription props={props} />
      {props.vinetas && (
        <div class="drtr-arte-ores">
          <div class="srte-prdsr-isrndfotms">
            {props.vinetas && (
              <>
                <hs-sr1>Sobre este artículo:</hs-sr1>
                <div class="detailed-list">
                  {props.vinetas.map((val: any) => (
                    <div class="crte-crot-sart">
                      <div class="cirle-bg"></div>
                      <div class="list">
                        <p-sr1>{val}</p-sr1>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
            {props.highlights && (
              <div class="crets-chrlsr-hrslrs-artes">
                <hs-sr1>Highlights:</hs-sr1>
                <ul class="detailed-list">
                  {props.highlights.map((val: any) => (
                    <li>{val}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
      {props.tbProtein && (
        <div class="drtr-arte-ores">
          <hs-sr1>Datos de nutrición de :</hs-sr1>
          <p-sr1> {props.name}</p-sr1>
          <div class="srte-prdsr-isrndfotms">
            <table>
              <tr>
                <th>Nutriente</th>
                <th>Cantidad por porción (30g)</th>
              </tr>
              {renderTbProtein('calories', 'Calories')}
              {renderTbProtein('carbohydrates', 'Carbohidratos')}{' '}
              {renderTbProtein('cholesteol', 'Colesterol')}
              {renderTbProtein('dietaryFiber', 'Fibra dietética')}{' '}
              {renderTbProtein('fat', 'Grasas')}{' '}
              {renderTbProtein('protein', 'Proteina')}
              {renderTbProtein('saturatedFat', 'Grasas saturada')}
              {renderTbProtein('sodium', 'Sodio')}
              {renderTbProtein('sugars', 'Azúcares')}
            </table>

            <p>
              ** Valores diarios basados en una dieta de 2,000 calorías. Valores
              diarios pueden ser mayores o menores según tus necesidades
              calóricas.
            </p>
          </div>
        </div>
      )}
    </div>
  );
});
