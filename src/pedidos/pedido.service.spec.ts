/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { PedidosService } from './pedidos.service';
import { PedidosRepository } from './pedidos.repository';
import { ClientesRepository } from 'src/clientes/clientes.repository';
import { ProdutoRepository } from 'src/produtos/produto.repository';
import { EntityManager } from '@mikro-orm/postgresql';
import { Produto } from 'src/produtos/produto.entity';
import { Cliente } from 'src/clientes/cliente.entity';
import { Pedido } from './pedido.entity';
import { PedidoItem } from './pedido-item.entity';
import { CreatePedidoDto } from './dto/create-pedido.dto';

const pedidoMock = {
  id: 1,
  addItem: jest.fn(),
};
jest.mock('./pedido.entity', () => {
  return {
    Pedido: jest.fn().mockImplementation(() => pedidoMock),
  };
});

const pedidoItemMock = {
  id: 1,
};
jest.mock('./pedido-item.entity', () => {
  return {
    PedidoItem: jest.fn().mockImplementation(() => pedidoItemMock),
  };
});

describe('PedidosService', () => {
  let pedidosService: PedidosService;
  let entityManager: EntityManager;

  const cliente = new Cliente({
    id: 1,
    nome: 'Fulano',
    email: 'fulano@email',
    telefone: '999999999',
    endereco: 'Rua 1',
  });

  const pedido = new Pedido(cliente, 'Rua 2');

  const produto = new Produto({
    id: 1,
    nome: 'Produto 1',
    preco: 10,
    estoque: 10,
  });

  const dto: CreatePedidoDto = {
    clienteId: 1,
    endereco: 'Rua 2',
    itens: [
      {
        produtoId: 1,
        quantidade: 1,
      },
    ],
  };

  const mockPedidosRepository = {
    findAll: jest.fn(() => [pedido]),
    findOne: jest.fn(() => pedido),
    findOneOrFail: jest.fn(() => pedido),
  };

  const mockClientesRepository = {
    findOne: jest.fn(() => cliente),
    findOneOrFail: jest.fn(() => cliente),
  };

  const mockProdutosRepository = {
    findOne: jest.fn(() => produto),
    findOneOrFail: jest.fn(() => produto),
  };

  const mockEntityManager = {
    persistAndFlush: jest.fn(),
    flush: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PedidosService,
        {
          provide: PedidosRepository,
          useValue: mockPedidosRepository,
        },
        {
          provide: ClientesRepository,
          useValue: mockClientesRepository,
        },
        {
          provide: ProdutoRepository,
          useValue: mockProdutosRepository,
        },
        {
          provide: EntityManager,
          useValue: mockEntityManager,
        },
      ],
    }).compile();

    pedidosService = module.get<PedidosService>(PedidosService);
    entityManager = module.get<EntityManager>(EntityManager);
  });

  it('should be defined', () => {
    expect(pedidosService).toBeDefined();
  });

  describe('create', () => {
    it('should call Pedido with correct arguments', async () => {
      await pedidosService.create(dto);

      expect(Pedido).toHaveBeenCalledWith(cliente, dto.endereco);
    });

    it('should call PedidoItem with correct arguments', async () => {
      await pedidosService.create(dto);

      expect(PedidoItem).toHaveBeenCalledWith(pedidoMock, produto, 1);
    });

    it('should call Pedido.addItem with correct arguments', async () => {
      await pedidosService.create(dto);

      expect(pedidoMock.addItem).toHaveBeenCalledWith(pedidoItemMock);
    });

    it('should call entityManager.persistAndFlush with correct arguments', async () => {
      await pedidosService.create(dto);

      expect(entityManager.persistAndFlush).toHaveBeenCalledWith(pedidoMock);
    });
  });
});
