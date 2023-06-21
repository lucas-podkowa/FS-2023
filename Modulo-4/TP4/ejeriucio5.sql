

-- a) select * from empleados;
-- b)
-- c) 
-- d) select emplaedo_id, cuil_cuit, nombre, apellido, departamento, estado from empleados;
-- i) select nombre, presupuesto as valor_actual from departamentos order by presupuesto, nombre asc
-- j) select nombre from departamentos order by nombre asc
-- s) select empleados.nombre as nombrecito, empleados.apellido as ape, departamentos.nombre as Nombre_Depa from empleados inner join departamentos on empleados.departamento = departamentos.departamento_id
-- k) select nombre from departamentos order by nombre desc
-- v) select departamentos.nombre from empleados inner join departamentos on empleados.departamento = departamentos.departamento_id where empleados.cuil_cuit = "27-38382980-3"
-- x) select empleados.*, departamentos.nombre from empleados inner join departamentos on empleados.departamento = departamentos.departamento_id and departamentos.nombre = "I+D" order by empleados.nombre, apellido
