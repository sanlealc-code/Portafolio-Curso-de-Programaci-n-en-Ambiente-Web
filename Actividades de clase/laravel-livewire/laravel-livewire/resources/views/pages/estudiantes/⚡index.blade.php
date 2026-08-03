<?php

use Livewire\Component;
use Livewire\WithPagination;
use Livewire\Attributes\Validate;
use Livewire\Attributes\Computed;
use App\Models\Estudiante;
use App\Models\Carrera;

new class extends Component {
    use WithPagination;


    public string $search = '';


    public bool $isModalOpen = false;
    public ?int $estudiante_id = null;


    #[Validate('required|string|max:20')]
    public string $carnet = '';

    #[Validate('required|string|max:100')]
    public string $nombre = '';

    #[Validate('required|string|max:100')]
    public string $apellidos = '';

    #[Validate('required|email')]
    public string $correo = '';

    #[Validate('required|exists:carreras,id')]
    public ?int $carrera_id = null;

    public bool $activo = true;


    public function updatedSearch()
    {
        $this->resetPage();
    }


    #[Computed]
    public function estudiantes()
    {
        return Estudiante::with('carrera')
            ->where('nombre', 'like', "%{$this->search}%")
            ->orWhere('carnet', 'like', "%{$this->search}%")
            ->orWhere('apellidos', 'like', "%{$this->search}%")
            ->orderBy('id', 'desc')
            ->paginate(10);
    }

    #[Computed]
    public function carreras()
    {
        return Carrera::where('activo', true)->get();
    }

    public function create()
    {
        $this->resetValidation();
        $this->reset(['estudiante_id', 'carnet', 'nombre', 'apellidos', 'correo', 'carrera_id', 'activo']);
        $this->isModalOpen = true;
    }

    public function edit(int $id)
    {
        $this->resetValidation();
        $estudiante = Estudiante::findOrFail($id);

        $this->estudiante_id = $id;
        $this->carnet = $estudiante->carnet;
        $this->nombre = $estudiante->nombre;
        $this->apellidos = $estudiante->apellidos;
        $this->correo = $estudiante->correo;
        $this->carrera_id = $estudiante->carrera_id;
        $this->activo = $estudiante->activo;

        $this->isModalOpen = true;
    }

    public function save()
    {
        $this->validate([
            'carnet' => 'required|string|max:20|unique:estudiantes,carnet,' . $this->estudiante_id,
            'correo' => 'required|email|unique:estudiantes,correo,' . $this->estudiante_id,
        ]);

        Estudiante::updateOrCreate(
            ['id' => $this->estudiante_id],
            [
                'carnet' => $this->carnet,
                'nombre' => $this->nombre,
                'apellidos' => $this->apellidos,
                'correo' => $this->correo,
                'carrera_id' => $this->carrera_id,
                'activo' => $this->activo,
            ]
        );

        $this->isModalOpen = false;
        session()->flash('success', $this->estudiante_id ? 'Estudiante actualizado exitosamente.' : 'Estudiante registrado.');
    }

    public function delete(int $id)
    {
        Estudiante::findOrFail($id)->delete();
        session()->flash('success', 'Estudiante eliminado.');
    }
};
?>


<div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
    <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold text-gray-800">Gestión de Estudiantes</h2>
        <button wire:click="create" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow">
            + Nuevo Estudiante
        </button>
    </div>


    <div class="mb-4">
        <input type="text" wire:model.live.debounce.300ms="search" placeholder="Buscar por nombre, carnet o apellidos..."
            class="w-full md:w-1/3 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
    </div>

    @if (session()->has('success'))
    <div class="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4" role="alert">
        <p>{{ session('success') }}</p>
    </div>
    @endif


    <div class="bg-white shadow overflow-hidden sm:rounded-lg">
        <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
                <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Carnet</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estudiante</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Carrera</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                    <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
                @forelse($this->estudiantes as $est)
                <tr>
                    <td class="px-6 py-4 whitespace-nowrap">{{ $est->carnet }}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm font-medium text-gray-900">{{ $est->nombre }} {{ $est->apellidos }}</div>
                        <div class="text-sm text-gray-500">{{ $est->correo }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">{{ $est->carrera->nombre }}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full {{ $est->activo ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800' }}">
                            {{ $est->activo ? 'Activo' : 'Inactivo' }}
                        </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button wire:click="edit({{ $est->id }})" class="text-indigo-600 hover:text-indigo-900 mr-3">Editar</button>
                        <button wire:click="delete({{ $est->id }})" wire:confirm="¿Seguro que deseas eliminar este estudiante?" class="text-red-600 hover:text-red-900">Eliminar</button>
                    </td>
                </tr>
                @empty
                <tr>
                    <td colspan="5" class="px-6 py-4 text-center text-gray-500">No se encontraron estudiantes.</td>
                </tr>
                @endforelse
            </tbody>
        </table>
        <div class="px-6 py-4">
            {{ $this->estudiantes->links() }}
        </div>
    </div>

    @if($isModalOpen)
    @teleport('body')
    <div class="fixed inset-0 z-[100] overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">

        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">


            <div class="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity" wire:click="$set('isModalOpen', false)" aria-hidden="true"></div>


            <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>


            <div class="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">


                <form wire:submit="save">
                    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div class="mb-4">
                            <label class="block text-gray-700 text-sm font-bold mb-2">Carnet</label>
                            <input type="text" wire:model="carnet" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700">
                            @error('carnet') <span class="text-red-500 text-xs italic">{{ $message }}</span> @enderror
                        </div>
                        <div class="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label class="block text-gray-700 text-sm font-bold mb-2">Nombre</label>
                                <input type="text" wire:model="nombre" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700">
                                @error('nombre') <span class="text-red-500 text-xs italic">{{ $message }}</span> @enderror
                            </div>
                            <div>
                                <label class="block text-gray-700 text-sm font-bold mb-2">Apellidos</label>
                                <input type="text" wire:model="apellidos" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700">
                                @error('apellidos') <span class="text-red-500 text-xs italic">{{ $message }}</span> @enderror
                            </div>
                        </div>
                        <div class="mb-4">
                            <label class="block text-gray-700 text-sm font-bold mb-2">Correo</label>
                            <input type="email" wire:model="correo" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700">
                            @error('correo') <span class="text-red-500 text-xs italic">{{ $message }}</span> @enderror
                        </div>
                        <div class="mb-4">
                            <label class="block text-gray-700 text-sm font-bold mb-2">Carrera</label>
                            <select wire:model="carrera_id" class="shadow border rounded w-full py-2 px-3 text-gray-700">
                                <option value="">Seleccione una carrera...</option>
                                @foreach($this->carreras as $carrera)
                                <option value="{{ $carrera->id }}">{{ $carrera->nombre }}</option>
                                @endforeach
                            </select>
                            @error('carrera_id') <span class="text-red-500 text-xs italic">{{ $message }}</span> @enderror
                        </div>
                        <div class="mb-4">
                            <label class="flex items-center">
                                <input type="checkbox" wire:model="activo" class="form-checkbox h-5 w-5 text-blue-600">
                                <span class="ml-2 text-gray-700">Estudiante Activo</span>
                            </label>
                        </div>
                    </div>
                    <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button type="submit" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 sm:ml-3 sm:w-auto sm:text-sm">
                            Guardar
                        </button>
                        <button type="button" wire:click="$set('isModalOpen', false)" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                            Cancelar
                        </button>
                    </div>
                </form>


            </div>
        </div>
    </div>
    @endteleport
    @endif

</div>