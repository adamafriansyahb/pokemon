import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toTitleCase } from '@/lib/utils';
import { TReleaseAction, TCaughtPokemon } from '@/types';

type TReleasePokemonModal = {
  onReleasePokemon: () => void;
  open: boolean;
  releaseType: TReleaseAction;
  selectedPokemon?: TCaughtPokemon;
  setOpen: (isOpen: boolean) => void;
};

const ReleasePokemonModal = ({
  onReleasePokemon,
  open,
  releaseType,
  selectedPokemon,
  setOpen,
}: TReleasePokemonModal) => {
  const title =
    releaseType === 'all'
      ? 'Are you sure to release all of your pokemons?'
      : `Are you sure to release ${toTitleCase(selectedPokemon?.nickname || '')} the ${toTitleCase(
          selectedPokemon?.pokemon.name || ''
        )}?`;

  const subtitle = `${
    releaseType === 'all' ? 'They' : toTitleCase(selectedPokemon?.nickname || '')
  } might be so sad to part with you..`;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{subtitle}</DialogDescription>
        </DialogHeader>

        {releaseType === 'all' && (
          <DialogDescription className="text-center text-7xl md:text-8xl pb-2">&#128575;</DialogDescription>
        )}

        {releaseType === 'single' && (
          <div className="flex justify-center">
            <Image alt="pokemon-image" src={selectedPokemon?.pokemon.sprites.front_default!} height={150} width={150} />
          </div>
        )}

        <DialogFooter className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row">
          <Button onClick={onReleasePokemon} variant="destructive">
            Yes, I am sure
          </Button>
          <Button onClick={() => setOpen(false)} variant="secondary">
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReleasePokemonModal;
