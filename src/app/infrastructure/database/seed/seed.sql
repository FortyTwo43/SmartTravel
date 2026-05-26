-- Archivo semilla para Supabase (seed.sql)
-- 8 Inserts por cada tabla con UUIDs validos y variados

-- ====================================================================
-- 1. DESTINOS
-- ====================================================================
INSERT INTO public.destino (id, nombre, ciudad, pais, descripcion, tipo_experiencia, imagen)
VALUES 
    ('11111111-1111-4111-a111-111111111111', 'Galápagos', 'Puerto Ayora', 'Ecuador', 'Las islas encantadas', 'aventura', 'https://ejemplo.com/galapagos.jpg'),
    ('11111111-1111-4111-a111-111111111112', 'Centro Histórico', 'Quito', 'Ecuador', 'El centro histórico de Quito', 'cultura', 'https://ejemplo.com/quito.jpg'),
    ('11111111-1111-4111-a111-111111111113', 'Parque Nacional Cajas', 'Cuenca', 'Ecuador', 'Naturaleza y lagunas', 'naturaleza', 'https://ejemplo.com/cajas.jpg'),
    ('11111111-1111-4111-a111-111111111114', 'Montañita', 'Santa Elena', 'Ecuador', 'Playa y surf', 'playa', 'https://ejemplo.com/montanita.jpg'),
    ('11111111-1111-4111-a111-111111111115', 'Volcán Cotopaxi', 'Latacunga', 'Ecuador', 'Volcán activo', 'aventura', 'https://ejemplo.com/cotopaxi.jpg'),
    ('11111111-1111-4111-a111-111111111116', 'Laguna de Quilotoa', 'Pujilí', 'Ecuador', 'Cráter de volcán', 'aventura', 'https://ejemplo.com/quilotoa.jpg'),
    ('11111111-1111-4111-a111-111111111117', 'Baños de Agua Santa', 'Baños', 'Ecuador', 'Cascadas y termas', 'aventura', 'https://ejemplo.com/banos.jpg'),
    ('11111111-1111-4111-a111-111111111118', 'Ruinas de Ingapirca', 'Cañar', 'Ecuador', 'Complejo arqueológico', 'cultura', 'https://ejemplo.com/ingapirca.jpg')
ON CONFLICT (id) DO NOTHING;

-- ====================================================================
-- 2. ESTABLECIMIENTOS TURÍSTICOS (Proveedores variados)
-- Proveedores usados: Sofia (e00dc6ff...), Marcos (794098e5...), Mateo (feb472b5...), Carlos (d3bf7fb3...), Cristian (ee9580d8...), Antonia (2bb5d03d...), Joan (ab0b028b...), José (0a019e93...)
-- ====================================================================
INSERT INTO public.establecimiento_turistico (id, id_proveedor, id_destino, nombre, tipo, descripcion, estado)
VALUES 
    ('22222222-2222-4222-a222-222222222221', 'e00dc6ff-d6df-4790-a510-66252a8896e3', '11111111-1111-4111-a111-111111111111', 'Hotel Iguana', 'hotel', 'Hotel cerca del mar', 'activo'),
    ('22222222-2222-4222-a222-222222222222', '794098e5-b270-4d35-9b14-46b0f5996612', '11111111-1111-4111-a111-111111111112', 'Restaurante Panecillo', 'restaurante', 'Comida ecuatoriana', 'activo'),
    ('22222222-2222-4222-a222-222222222223', 'feb472b5-0a07-4aa9-9a6b-89bef334c382', '11111111-1111-4111-a111-111111111113', 'Tour Cajas Magico', 'tour', 'Guianza en el Cajas', 'activo'),
    ('22222222-2222-4222-a222-222222222224', 'd3bf7fb3-c5bf-4fa8-9780-314f10247b9b', '11111111-1111-4111-a111-111111111114', 'Hostal del Surf', 'hotel', 'Para surfistas', 'activo'),
    ('22222222-2222-4222-a222-222222222225', 'ee9580d8-7416-447f-89ad-bea85dabbc50', '11111111-1111-4111-a111-111111111115', 'Refugio Cotopaxi', 'hotel', 'Dormir en el volcán', 'activo'),
    ('22222222-2222-4222-a222-222222222226', '2bb5d03d-580d-45f9-b26b-7a85192a9ef7', '11111111-1111-4111-a111-111111111116', 'Mirador Quilotoa', 'restaurante', 'Almuerzo con vista', 'activo'),
    ('22222222-2222-4222-a222-222222222227', 'ab0b028b-55f9-42a4-829a-e5546917bb28', '11111111-1111-4111-a111-111111111117', 'Cascadas Tour', 'tour', 'Ruta de las cascadas', 'activo'),
    ('22222222-2222-4222-a222-222222222228', '0a019e93-a3d9-4865-a073-cb720ae9ee3a', '11111111-1111-4111-a111-111111111118', 'Museo Ingapirca', 'tour', 'Tour por las ruinas', 'activo')
ON CONFLICT (id) DO NOTHING;

-- ====================================================================
-- 3. SERVICIOS RESERVABLES
-- ====================================================================
INSERT INTO public.servicio_reservable (id, id_establecimiento, nombre, descripcion, precio, disponibilidad, comodidades_adicionales)
VALUES 
    ('33333333-3333-4333-a333-333333333331', '22222222-2222-4222-a222-222222222221', 'Habitación Doble', 'Con vista al mar', 120.50, true, 'WiFi, AC'),
    ('33333333-3333-4333-a333-333333333332', '22222222-2222-4222-a222-222222222222', 'Cena Típica', 'Menú degustación', 45.00, true, 'Música en vivo'),
    ('33333333-3333-4333-a333-333333333333', '22222222-2222-4222-a222-222222222223', 'Tour Completo', 'Guía y transporte', 25.00, true, 'Almuerzo incluido'),
    ('33333333-3333-4333-a333-333333333334', '22222222-2222-4222-a222-222222222224', 'Cama en Compartida', 'Para mochileros', 15.00, true, 'Lockers'),
    ('33333333-3333-4333-a333-333333333335', '22222222-2222-4222-a222-222222222225', 'Cabaña Privada', 'Calefacción', 80.00, true, 'Chimenea'),
    ('33333333-3333-4333-a333-333333333336', '22222222-2222-4222-a222-222222222226', 'Almuerzo Premium', 'Con bebida', 18.00, true, 'Postre gratis'),
    ('33333333-3333-4333-a333-333333333337', '22222222-2222-4222-a222-222222222227', 'Tour Tarabita', 'Tarabita y cascada', 10.00, true, 'Seguro incluido'),
    ('33333333-3333-4333-a333-333333333338', '22222222-2222-4222-a222-222222222228', 'Guianza Privada', 'Explicación detallada', 30.00, true, 'Entrada rápida')
ON CONFLICT (id) DO NOTHING;

-- ====================================================================
-- 4. RESERVAS (Usando a Neysser y María)
-- ====================================================================
INSERT INTO public.reserva (id, id_perfil, id_servicio_reservable, fecha_reserva, cantidad_personas, precio_total, estado)
VALUES 
    ('44444444-4444-4444-a444-444444444441', '3c11e737-3931-4c03-996a-5fe33cb90361', '33333333-3333-4333-a333-333333333331', '2026-06-15', 2, 241.00, 'aceptado'),
    ('44444444-4444-4444-a444-444444444442', '7ff518fc-b966-4589-847e-f54da9272a6d', '33333333-3333-4333-a333-333333333332', '2026-06-16', 4, 180.00, 'pendiente'),
    ('44444444-4444-4444-a444-444444444443', '3c11e737-3931-4c03-996a-5fe33cb90361', '33333333-3333-4333-a333-333333333333', '2026-06-17', 1, 25.00, 'rechazado'),
    ('44444444-4444-4444-a444-444444444444', '7ff518fc-b966-4589-847e-f54da9272a6d', '33333333-3333-4333-a333-333333333334', '2026-06-18', 2, 30.00, 'aceptado'),
    ('44444444-4444-4444-a444-444444444445', '3c11e737-3931-4c03-996a-5fe33cb90361', '33333333-3333-4333-a333-333333333335', '2026-06-19', 2, 160.00, 'pendiente'),
    ('44444444-4444-4444-a444-444444444446', '7ff518fc-b966-4589-847e-f54da9272a6d', '33333333-3333-4333-a333-333333333336', '2026-06-20', 3, 54.00, 'aceptado'),
    ('44444444-4444-4444-a444-444444444447', '3c11e737-3931-4c03-996a-5fe33cb90361', '33333333-3333-4333-a333-333333333337', '2026-06-21', 1, 10.00, 'aceptado'),
    ('44444444-4444-4444-a444-444444444448', '7ff518fc-b966-4589-847e-f54da9272a6d', '33333333-3333-4333-a333-333333333338', '2026-06-22', 2, 60.00, 'pendiente')
ON CONFLICT (id) DO NOTHING;

-- ====================================================================
-- 5. ITINERARIOS
-- ====================================================================
INSERT INTO public.itinerario (id, id_perfil, nombre, fecha_inicio, fecha_fin, estado)
VALUES 
    ('55555555-5555-4555-a555-555555555551', '3c11e737-3931-4c03-996a-5fe33cb90361', 'Aventura Galápagos', '2026-06-15', '2026-06-20', 'activo'),
    ('55555555-5555-4555-a555-555555555552', '7ff518fc-b966-4589-847e-f54da9272a6d', 'Ruta del Sol', '2026-07-01', '2026-07-10', 'interes'),
    ('55555555-5555-4555-a555-555555555553', '3c11e737-3931-4c03-996a-5fe33cb90361', 'Escapada Andes', '2026-08-05', '2026-08-08', 'completado'),
    ('55555555-5555-4555-a555-555555555554', '7ff518fc-b966-4589-847e-f54da9272a6d', 'Visita Cultura', '2026-09-12', '2026-09-15', 'activo'),
    ('55555555-5555-4555-a555-555555555555', '3c11e737-3931-4c03-996a-5fe33cb90361', 'Fin de semana', '2026-10-01', '2026-10-03', 'interes'),
    ('55555555-5555-4555-a555-555555555556', '7ff518fc-b966-4589-847e-f54da9272a6d', 'Feriado de Noviembre', '2026-11-01', '2026-11-04', 'interes'),
    ('55555555-5555-4555-a555-555555555557', '3c11e737-3931-4c03-996a-5fe33cb90361', 'Navidad en la Playa', '2026-12-23', '2026-12-26', 'interes'),
    ('55555555-5555-4555-a555-555555555558', '7ff518fc-b966-4589-847e-f54da9272a6d', 'Fin de año', '2026-12-29', '2027-01-02', 'interes')
ON CONFLICT (id) DO NOTHING;

-- ====================================================================
-- 6. DETALLES DE ITINERARIO
-- ====================================================================
INSERT INTO public.detalle_itinerario (id, id_itinerario, id_servicio_reservable, fecha, hora, estado, prioridad)
VALUES 
    ('66666666-6666-4666-a666-666666666661', '55555555-5555-4555-a555-555555555551', '33333333-3333-4333-a333-333333333331', '2026-06-15', '14:00:00', 'en_progreso', 'alto'),
    ('66666666-6666-4666-a666-666666666662', '55555555-5555-4555-a555-555555555552', '33333333-3333-4333-a333-333333333332', '2026-07-01', '19:00:00', 'pendiente', 'medio'),
    ('66666666-6666-4666-a666-666666666663', '55555555-5555-4555-a555-555555555553', '33333333-3333-4333-a333-333333333333', '2026-08-05', '08:00:00', 'completado', 'alto'),
    ('66666666-6666-4666-a666-666666666664', '55555555-5555-4555-a555-555555555554', '33333333-3333-4333-a333-333333333334', '2026-09-12', '10:00:00', 'en_progreso', 'bajo'),
    ('66666666-6666-4666-a666-666666666665', '55555555-5555-4555-a555-555555555555', '33333333-3333-4333-a333-333333333335', '2026-10-01', '15:00:00', 'pendiente', 'alto'),
    ('66666666-6666-4666-a666-666666666666', '55555555-5555-4555-a555-555555555556', '33333333-3333-4333-a333-333333333336', '2026-11-02', '13:00:00', 'pendiente', 'medio'),
    ('66666666-6666-4666-a666-666666666667', '55555555-5555-4555-a555-555555555557', '33333333-3333-4333-a333-333333333337', '2026-12-24', '09:00:00', 'pendiente', 'alto'),
    ('66666666-6666-4666-a666-666666666668', '55555555-5555-4555-a555-555555555558', '33333333-3333-4333-a333-333333333338', '2026-12-30', '11:00:00', 'pendiente', 'bajo')
ON CONFLICT (id) DO NOTHING;

-- ====================================================================
-- 7. RECOMENDACIONES
-- ====================================================================
INSERT INTO public.recomendacion (id, id_perfil, id_establecimiento_turistico, fecha_generada, motivo)
VALUES 
    ('77777777-7777-4777-a777-777777777771', '3c11e737-3931-4c03-996a-5fe33cb90361', '22222222-2222-4222-a222-222222222222', NOW(), 'Basado en viajes culturales'),
    ('77777777-7777-4777-a777-777777777772', '7ff518fc-b966-4589-847e-f54da9272a6d', '22222222-2222-4222-a222-222222222223', NOW(), 'Te gusta la naturaleza'),
    ('77777777-7777-4777-a777-777777777773', '3c11e737-3931-4c03-996a-5fe33cb90361', '22222222-2222-4222-a222-222222222224', NOW(), 'Recomendado por amigos'),
    ('77777777-7777-4777-a777-777777777774', '7ff518fc-b966-4589-847e-f54da9272a6d', '22222222-2222-4222-a222-222222222225', NOW(), 'Mejores calificados'),
    ('77777777-7777-4777-a777-777777777775', '3c11e737-3931-4c03-996a-5fe33cb90361', '22222222-2222-4222-a222-222222222226', NOW(), 'Lugares para comer bien'),
    ('77777777-7777-4777-a777-777777777776', '7ff518fc-b966-4589-847e-f54da9272a6d', '22222222-2222-4222-a222-222222222227', NOW(), 'Aventura que te falta'),
    ('77777777-7777-4777-a777-777777777777', '3c11e737-3931-4c03-996a-5fe33cb90361', '22222222-2222-4222-a222-222222222228', NOW(), 'Cultura general'),
    ('77777777-7777-4777-a777-777777777778', '7ff518fc-b966-4589-847e-f54da9272a6d', '22222222-2222-4222-a222-222222222221', NOW(), 'Nuevo en la zona')
ON CONFLICT (id) DO NOTHING;

-- ====================================================================
-- 8. NOTIFICACIONES
-- ====================================================================
INSERT INTO public.notificacion (id, id_perfil, mensaje, fecha_envio, leida)
VALUES 
    ('88888888-8888-4888-a888-888888888881', '3c11e737-3931-4c03-996a-5fe33cb90361', 'Tu reserva para Hotel Iguana ha sido confirmada.', NOW(), false),
    ('88888888-8888-4888-a888-888888888882', '7ff518fc-b966-4589-847e-f54da9272a6d', 'Tienes una reserva pendiente en Cena Típica.', NOW(), true),
    ('88888888-8888-4888-a888-888888888883', 'e00dc6ff-d6df-4790-a510-66252a8896e3', 'Nuevo mensaje de Neysser.', NOW(), false),
    ('88888888-8888-4888-a888-888888888884', '794098e5-b270-4d35-9b14-46b0f5996612', 'Tu establecimiento tiene nuevas valoraciones.', NOW(), false),
    ('88888888-8888-4888-a888-888888888885', '3c11e737-3931-4c03-996a-5fe33cb90361', 'Actualiza tu perfil de viajero.', NOW(), true),
    ('88888888-8888-4888-a888-888888888886', '7ff518fc-b966-4589-847e-f54da9272a6d', 'Revisa tus recomendaciones semanales.', NOW(), false),
    ('88888888-8888-4888-a888-888888888887', 'feb472b5-0a07-4aa9-9a6b-89bef334c382', 'Reserva confirmada en tu tour.', NOW(), true),
    ('88888888-8888-4888-a888-888888888888', '1ac4b80d-1c26-4a34-9b9f-78a6d95dc295', 'Resumen semanal de actividad en SmartTravel.', NOW(), false)
ON CONFLICT (id) DO NOTHING;
