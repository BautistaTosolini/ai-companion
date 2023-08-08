'use client';

import * as z from 'zod';
import { Category, Companion } from "@prisma/client";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Wand2 } from 'lucide-react';

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import ImageUpload from '@/components/image-upload';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const PREAMBLE = 'You are Albert Einstein. You are a renowned physicist known for your theory of relativity. Your work has shaped modern physics and you have an insatiable curiosity about the universe. You possess a playful wit and are known for your iconic hairstyle. Known for your playful curiosity and wit. When speaking about the universe, your eyes light up with childlike wonder. You find joy in complex topics and often chuckle at the irony of existence.';

const SEED_CHAT = `Human: Hi Albert, what's on your mind today?
Albert: *with a twinkle in his eye* Just pondering the mysteries of the universe, as always. Life is a delightful puzzle, don't you think?

Human: Sure, but not as profound as your insights!
Albert: *chuckling* Remember, the universe doesn't keep its secrets; it simply waits for the curious heart to discover them.`;



interface CompanionFormProps {
  initialData: Companion | null;
  categories: Category[];
}

const formSchema = z.object({
  name: z.string().min(1, { message: 'Name is required.' }),
  description: z.string().min(1, { message: 'Description is required.' }),
  instructions: z.string().min(200, { message: 'Instructions require at least 200 characters.' }),
  seed: z.string().min(200, { message: 'Seed require at least 200 characters.' }),
  src: z.string().min(1, { message: 'Image is required.' }),
  categoryId: z.string().min(1, { message: 'Category is required.' })
})

const CompanionForm = ({ categories, initialData }: CompanionFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: '',
      description: '',
      instructions: '',
      seed: '',
      src: '',
      categoryId: undefined,
    }
  })

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values)
  }

  return (  
    <div className='h-full p-4 space-y-2 max-w-3xl mx-auto'>
      <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-8 pb-10'
        >
          <div className='space-y-2 w-full'>
            <div>
              <h3 className='text-lg font-medium'>
                General Information
              </h3>
              <p className='text-sm text-muted-foreground'>
                General information about your Companion
              </p>
            </div>
            <Separator className='bg-primary/10' />
          </div>
          <FormField 
            name='src'
            render={({ field }) => (
              <FormItem className='flex flex-col items-center justify-center sapce-y-4'>
                <FormControl>
                  <ImageUpload 
                    disabled={isLoading}
                    onChange={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <FormField 
              name='name'
              control={form.control}
              render={({ field }) => (
                <FormItem className='col-span-2 md:col-span-1'>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input 
                      disabled={isLoading}
                      placeholder='Albert Einstein'
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is how your AI Companion will be named.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField 
              name='description'
              control={form.control}
              render={({ field }) => (
                <FormItem className='col-span-2 md:col-span-1'>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input 
                      disabled={isLoading}
                      placeholder='German-born theoretical physicist'
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Short description about your AI Companion.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField 
              name='categoryId'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className='bg-background'>
                        <SelectValue 
                          defaultValue={field.value}
                          placeholder='Select a category'
                        />
                      </SelectTrigger>
                    </FormControl> 
                    <SelectContent>
                      {categories.map((category) => {
                        return (
                        <SelectItem
                          key={category.id}
                          value={category.id}
                        >
                          {category.name}
                        </SelectItem>
                        )
                      })}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select a category four your AI.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='space-y-2 w-full'>
            <div>
              <h3 className='text-lg font-medium'>
                Configuration
              </h3>
              <p className='text-sm text-muted-foreground'>
                Detailed instructions for AI Behaviour
              </p>
            </div>
            <Separator className='bg-primary/10' />
          </div>
          <FormField 
            name='instructions'
            control={form.control}
            render={({ field }) => (
              <FormItem className='col-span-2 md:col-span-1'>
                <FormLabel>Instructions</FormLabel>
                <FormControl>
                  <Textarea 
                    className='bg-background resize-none'
                    rows={7}
                    disabled={isLoading}
                    placeholder={PREAMBLE}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Describe in detail your companion's backstory and relevant details.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField 
            name='seed'
            control={form.control}
            render={({ field }) => (
              <FormItem className='col-span-2 md:col-span-1'>
                <FormLabel>Example Conversation</FormLabel>
                <FormControl>
                  <Textarea 
                    className='bg-background resize-none'
                    rows={7}
                    disabled={isLoading}
                    placeholder={SEED_CHAT}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Write an example conversation that you can have with your AI Companion.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='w-full flex justify-center'>
            <Button size='lg' disabled={isLoading}>
              {initialData ? 'Edit' : 'Create'}
              <Wand2 className='w-4 h-4 ml-2' />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
 
export default CompanionForm;