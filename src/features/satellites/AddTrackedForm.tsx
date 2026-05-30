import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useTrackedStore } from '@/store/useTrackedStore'
import { Button } from '@/components/ui/button'

// Validation schema lives next to the form. Zod gives us both runtime
// validation and the inferred TypeScript type for the form values.
const schema = z.object({
  noradId: z.coerce.number().int().positive('Enter a valid NORAD id'),
})
type FormValues = z.infer<typeof schema>

export function AddTrackedForm() {
  const add = useTrackedStore((s) => s.add)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) })

  const onSubmit = (values: FormValues) => {
    add(values.noradId)
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-1">
      <label htmlFor="noradId" className="text-xs uppercase tracking-wide text-white/50">
        Track by NORAD id
      </label>
      <div className="flex gap-2">
        <input
          id="noradId"
          inputMode="numeric"
          placeholder="25544"
          className="w-full rounded-md border border-white/15 bg-transparent px-3 py-2 text-sm outline-none focus:border-sky-400"
          {...register('noradId')}
        />
        <Button type="submit">Add</Button>
      </div>
      {errors.noradId && <p className="text-xs text-red-400">{errors.noradId.message}</p>}
    </form>
  )
}
